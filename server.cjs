const express = require('express')
const mongoose = require('mongoose')
const Lesson = require('./models/lessons.cjs')
const Category = require('./models/categories.cjs')
//const Semester = require('./models/categories.cjs')
const Part = require('./models/lessons.cjs')
const Quiz = require('./models/lessons.cjs')

//const mongoDB = 'mongodb+srv://eLearningUser:eLearning450@cluster0.mttrqxy.mongodb.net/learningContent-database2?retryWrites=true&w=majority'
mongoose.connect('mongodb://localhost/eLearning-try')

// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//   console.log('connected')
// }).catch(err => console.log(err))

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

const lessonsArray = []

   io.on("connection", (socket) => {

    async function listLessons() {
      const lessons = await Lesson.find()
          console.log(lessons)
          socket.emit('send-lessons', lessons)
          
    }

    async function listCategories() {
      const categories = await Category.find()
          socket.emit('send-categories', categories)
    }

    listCategories()
    listLessons()

      console.log(`[SOCKET CONNECTED] ${socket.id}`)

      socket.emit("connected", socket.id)

      socket.on("enter-class", (categoryName) => {
          //listLessons(categoryName)
          socket.emit("data", categoryName)
      })

      socket.on('displayLesson', () => {
        socket.emit('displayLessonS')
      })

    socket.on("displayContent", (partContent) => {
      socket.emit("displayPartS", partContent)
      //socket.emit("currentInfo", partContent )
  })
 })

//----------------------mongoose------------------

//--------------------createLesson----------------

// async function createLesson(name, category, semester, parts, quiz) {
//   const lesson = new Lesson({
//       name,
//       category,
//       semester,
//       parts, 
//       quiz
//   })

//   const result = await lesson.save()
//   console.log(result)
// }


// createLesson("Lesson 3 S2", "Clasa a 9-a", "Semester 2", [
//   new Part({ name: 'Part 1'}),
//   new Part({ name: 'Part 2'})
// ], 
//   new Quiz({ name: 'Quiz Lesson 3 Sem 2 Cls 9'})

// )

//------------------createCategory---------------------

// async function createCategory(name) {
//   const category = new Category({
//       name
//   })

//   const result = await category.save()
//   console.log(result)
// }


// createCategory("Clasa a 12-a")


//-------------------mongoose-finish-----------------