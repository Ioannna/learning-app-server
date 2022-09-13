const express = require('express')
const mongoose = require('mongoose')
const Lesson = require('./models/lessons.cjs')

const mongoDB = 'mongodb+srv://eLearningUser:eLearning450@cluster0.mttrqxy.mongodb.net/learningContent-database2?retryWrites=true&w=majority'

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
  console.log('connected')
}).catch(err => console.log(err))

const app = express()
const http = require('http')
const { Server } = require('socket.io')


const port = 3000
const server = http.createServer(app);
const io = new Server(server)

app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  const Parts = [
    ["Lectia 1 Partea 1", "Lectia 1 Partea 2", "Lectia 1 Quiz"],
    ["Lectia 2 Partea 1", "Lectia 2 Partea 2", "Lectia 2 Quiz"],
    ["Lectia 3 Partea 1", "Lectia 3 Partea 2", "Lectia 3 Quiz"]
  ];

  io.on("connection", (socket) => {

    Lesson.find().then(result => {
      socket.emit('send-lessons', result)
    })

      console.log(`[SOCKET CONNECTED] ${socket.id}`)

      socket.emit("connected", socket.id)

      socket.on("enter-class", (className) => {
          socket.emit("data", className)
      })

      socket.on('displayLesson', () => {
        socket.emit('displayLessonS')
      })

    socket.on("displayContent", ({ lessonNumber, partNumber }) => {
      socket.emit("displayPartS", Parts[lessonNumber-1][partNumber-1])
      socket.emit("currentInfo",{ lessonNumber: lessonNumber, partNumber: partNumber } )
  })
})