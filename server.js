import express from "express"
const app = express()
import http from "http"
import { Server } from "socket.io"

import { dirname } from "path"; 
import { fileURLToPath } from "url";

const port = 3000
const server = http.createServer(app);
const io = new Server(server)

const __filename = fileURLToPath(import.meta.url);
app.use(express.static(dirname(__filename)));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });

  server.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });

  let lessonsFirstSemester = ["Lessoooon1", "Lesson2", "Lesson2"]
  const Parts = [
    ["Lectia 1 Partea 1", "Lectia 1 Partea 2", "Lectia 1 Quiz"],
    ["Lectia 2 Partea 1", "Lectia 2 Partea 2", "Lectia 2 Quiz"],
    ["Lectia 3 Partea 1", "Lectia 3 Partea 2", "Lectia 3 Quiz"]
  ];
  let lessonsSecondSemester = ["2L1", "2L2", "2L3"]

  io.on("connection", (socket) => {
      console.log(`[SOCKET CONNECTED] ${socket.id}`)

      socket.emit("connected", socket.id)

      socket.on("enter-class", (className) => {

          socket.emit("data", className)
      })

      socket.on("first-semester", (name) => {
          socket.emit("lessons-first-semester", lessonsFirstSemester)
      })

      socket.on("second-semester", (name) => {
        socket.emit("lessons-second-semester", lessonsSecondSemester)
    })

    socket.on("display-lesson", (name) => {
        socket.emit("display-lesson1", lessonsFirstSemester[0])
    })

    socket.on("displayPart", ({ lessonNumber, partNumber }) => {
        socket.emit("displayPartS", Parts[lessonNumber-1][partNumber-1])
        socket.emit("currentInfo",{ lessonNumber: lessonNumber, partNumber: partNumber } )
        console.log(`this is lessonNumber ${lessonNumber}`)
        console.log(`this is partNumber ${lessonNumber}`)
        console.log(`this is partNumber ${Parts[lessonNumber-1][partNumber-1]}`)
    })

    socket.on("displayNextLesson", ({ lessonNumber, partNumber }) => {
      socket.emit("displayPartS", Parts[lessonNumber-1][partNumber-1])
      console.log(`this is lessonNumber ${lessonNumber}`)
      console.log(`this is partNumber ${lessonNumber}`)
      console.log(`this is partNumber ${Parts[lessonNumber-1][partNumber-1]}`)
  })
})