//mongodb+srv://mannysally000:AnotherDayAnotherSlay@bob0.ezj6avw.mongodb.net/?retryWrites=true&w=majority&appName=Bob0";

const express = require('express')
const connectDB = require('./db.js')
const itemModel = require('./models/Item.js')
const userModel = require('./models/Users.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


connectDB()


app.get('/', async (req, res) => {
    const response = await itemModel.find()
    return res.json({items: response})
});

app.get('/', async (req, res) => {
    const response = await userModel.find()
    return res.json({items: response})
});


app.listen(3000, () => {
    console.log('app is running on port 3000')
})
