const mongoose = require("mongoose")

const partSchema = new mongoose.Schema({
    name: String
})

const Part = mongoose.model('Part', partSchema)

const quizSchema = new mongoose.Schema({
    name: String
})

const Quiz = mongoose.model('Quiz', quizSchema)

const lessonSchema = mongoose.Schema({
    name: String,
    category: String,
    semester: String,
    parts: [ partSchema ],
    quiz: quizSchema
})


const Lesson = mongoose.model('Lesson', lessonSchema)

module.exports = Part
module.exports = Quiz
module.exports = Lesson
