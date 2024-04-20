require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500
const User = require('./model/User')
const Menu = require('./model/Menu')

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

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})