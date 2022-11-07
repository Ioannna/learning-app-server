const mongoose = require("mongoose")

const thisPartSchema = new mongoose.Schema({
    name: String,
    content: String
})

const thisPart = mongoose.model('thisPart', thisPartSchema)

const thisQuizSchema = new mongoose.Schema({
    name: String,
    content: String,
})

const thisQuiz = mongoose.model('thisQuiz', thisQuizSchema)

const thisLessonSchema = mongoose.Schema({
    name: String,
    category: String,
    semester: String,
    content: String,
    parts: [ thisPartSchema ],
    quiz: thisQuizSchema
})

const thisLesson = mongoose.model('thisLesson', thisLessonSchema)


module.exports = thisPart
module.exports = thisQuiz
module.exports = thisLesson


