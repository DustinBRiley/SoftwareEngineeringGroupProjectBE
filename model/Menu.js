const mongoose = require('mongoose')
const Schema = mongoose.Schema

const menuSchema = new Schema({
    dish: {
        type: String,
        required: true
    },
    time: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Menu', menuSchema)