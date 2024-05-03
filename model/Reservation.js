const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Reservation', resSchema)