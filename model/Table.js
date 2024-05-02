const mongoose = require('mongoose')
const Schema = mongoose.Schema

const tableSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Table', tableSchema)