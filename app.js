require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500
const User = require('./model/User')
const Menu = require('./model/Menu')
const Ingredient = require('./model/Ingredient')
const Item = require('./model/Item')
const Reservation = require("./model/Reservation")
const Table = require('./model/Table')
const Order = require('./model/Order')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)
    } catch (err) {
        console.error(err)
    }
}

connectDB()

app.use(cors())
// form data
// app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.get('/', (req,res) => {
    res.send("Welcome to CRMSA API")
})

app.get('/users', async (req,res) => {
    const users = await User.find()
    res.json(users)
})

app.get('/menu', async (req,res) => {
    const menus = await Menu.find()
    res.json(menus)
})

app.get('/ingredients', async (req,res) => {
    const ingredients = await Ingredient.find()
    res.json(ingredients)
})

app.put('/ingredients', async (req,res) => {
    if(!req.body._id) {
      return res.status(400).json({message: "id is required"})
    }
    const ingredient = await Ingredient.findOne({_id: req.body._id})
    if(!ingredient) {
      return res.status(400).json({message: `ingredient id ${req.body._id} not found`})
    }
    ingredient.quantity = req.body.quantity
    const result = await ingredient.save()
    res.json(result)
})

app.get('/items', async (req,res) => {
    const items = await Item.find()
    res.json(items)
})

app.put('/items', async (req,res) => {
    if(!req.body._id) {
      return res.status(400).json({message: "id is required"})
    }
    const item = await Item.findOne({_id: req.body._id})
    if(!item) {
      return res.status(400).json({message: `item id ${req.body._id} not found`})
    }
    item.quantity = req.body.quantity
    const result = await item.save()
    res.json(result)
})

app.get('/tables', async (req,res) => {
    const tables = await Table.find()
    res.json(tables)
})

app.put('/tables', async (req,res) => {
    if(!req.body._id) {
      return res.status(400).json({message: "id is required"})
    }
    const table = await Table.findOne({_id: req.body._id})
    if(!table) {
      return res.status(400).json({message: `table id ${req.body._id} not found`})
    }
    table.status = req.body.status
    const result = await table.save()
    res.json(result)
})

app.get('/orders', async (req,res) => {
    const orders = await Order.find()
    res.json(orders)
})

app.post('/orders', async (req,res) => {
    if(!req.body) {
        return res.status(400).json({message: "body is required"})
    }
    const result = await Order.create({
        tableNumber: req.body.tableNumber,
        order: req.body.order,
        status: req.body.status
    })
    res.json(result)
})

app.put('/orders', async (req,res) => {
    if(!req.body._id) {
      return res.status(400).json({message: "id is required"})
    }
    const order = await Order.findOne({_id: req.body._id})
    if(!order) {
      return res.status(400).json({message: `order id ${req.body._id} not found`})
    }
    order.status = req.body.status
    const result = await order.save()
    res.json(result)
})

app.delete('/orders', async (req,res) => {
    if(!req.body._id) {
      return res.status(400).json({message: "_id is required"})
    }
    const order = await Order.findOne({_id: req.body._id})
    if(!order) {
      return res.status(400).json({message: `order _id ${req.body._id} not found`})
    }
    const result = await Order.deleteOne({_id: req.body._id})
    res.json(result)
})

app.get('/reservations', async (req,res) => {
     const reservations = await Reservation.find()
     res.json(reservations)
})

app.post('/reservations', async (req,res) => {
    if(!req.body) {
        return res.status(400).json({message: "body is required"})
    }
    const result = await Reservation.create({
        tableNumber: req.body.tableNumber,
        name: req.body.name
    })
    res.json(result)
})

app.delete('/reservations', async (req,res) => {
    if(!req.body._id) {
        return res.status(400).json({message: "_id is required"})
    }
    const order = await Reservation.findOne({_id: req.body._id})
    if(!order) {
      return res.status(400).json({message: `order _id ${req.body._id} not found`})
    }
    const result = await Reservation.deleteOne({_id: req.body._id})
    res.json(result)
})

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})