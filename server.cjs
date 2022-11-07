const express = require('express')
const mongoose = require('mongoose')
const Lesson = require('./models/lesson.cjs')
const Category = require('./models/categories.cjs')
const thisPart = require('./models/lesson.cjs')
const thisQuiz = require('./models/lesson.cjs')
const Item = require('./models/item.cjs')
const Fruit = require('./models/item.cjs')

mongoose.connect('mongodb://localhost/learningApp')

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

// async function createThisLesson(name, category, semester, content, parts, quiz) {
//   const thislesson = new Lesson({
//       name,
//       category,
//       semester,
//       content,
//       parts, 
//       quiz
//   })

//   const res = await thislesson.save()
//   console.log(res)
// }


// createThisLesson("Lectia 3", "Clasa a 9-a", "Semestrul 1", "", [
//   new thisPart({ name: 'Partea 1', content: '<iframe width="560" height="315" src="https://www.youtube.com/embed/pxIbOwIvKOw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>'}),
//   new thisPart({ name: 'Partea 2', content: 'Partea 2 - Lectia 3'})
// ], 
//   new thisQuiz({ name: 'Quiz ', content: 'Quiz Lectia 3'})

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