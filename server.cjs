const express = require('express')
const mongoose = require('mongoose')
const Lesson = require('./models/lessons.cjs')
const Category = require('./models/categories.cjs')
const Part = require('./models/lessons.cjs')
const Quiz = require('./models/lessons.cjs')

mongoose.connect('mongodb://localhost/eLearning-try')

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

   io.on("connection", (socket) => {

    async function listLessons(categoryName) {
      const lessons = await Lesson.find({category: categoryName})
          console.log(lessons)
          console.log(categoryName)
          socket.emit('send-lessons', lessons)
          socket.emit("data", categoryName)
          
    }

    async function listCategories() {
      const categories = await Category.find()
          socket.emit('send-categories', categories)
    }

    listCategories()
    //listLessons()

      console.log(`[SOCKET CONNECTED] ${socket.id}`)

      socket.emit("connected", socket.id)

      socket.on("enter-class", (categoryName) => {
          listLessons(categoryName)
      })

      socket.on('displayLesson', () => {
        socket.emit('displayLessonS')
      })

    socket.on("displayContent", (partContent) => {
      socket.emit("displayPartS", partContent)
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


// createLesson("Lectia 3", "Clasa a 10-a", "Semestrul 1", [
//   new Part({ name: 'Partea 1'}),
//   new Part({ name: 'Partea 2'})
// ], 
//   new Quiz({ name: 'Quiz Lectia 3 Sem 1 Cls 10'})

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