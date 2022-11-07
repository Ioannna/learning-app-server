const mongoose = require("mongoose")

const fruitSchema = new mongoose.Schema({
    name: String,
    content: String
})

const Fruit = mongoose.model('Fruit', fruitSchema)

const itemSchema = new mongoose.Schema({
    name: String,
    content: String,
    fruits: [ fruitSchema ]
})

const Item = mongoose.model('Item', itemSchema)

module.exports = Fruit
module.exports = Item




