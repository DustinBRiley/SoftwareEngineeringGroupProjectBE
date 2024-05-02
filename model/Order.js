const mongoose = require('mongoose')
const Schema = mongoose.Schema

const orderSchema = new Schema({
    tableNumber: {
        type: Number,
        required: true
    },
    order: {
        type: Array,
        required: true
    },
    status: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Order', orderSchema)