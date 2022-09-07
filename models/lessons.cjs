const mongoose = require("mongoose")

const lessonSchema = new mongoose.Schema({
    lesson:{
        type: String,
        required: true,
    }
})

const Lesson = mongoose.model('lesson', lessonSchema)

module.exports = Lesson