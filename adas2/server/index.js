//mongodb+srv://mannysally000:AnotherDayAnotherSlay@bob0.ezj6avw.mongodb.net/?retryWrites=true&w=majority&appName=Bob0";

const express = require('express')
const connectDB = require('./db.js')
const itemModel = require('./models/Item.js')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())


connectDB()


app.get('/', (req, res) => {
    const items = itemModel.find()
    res.json
});


app.listen(3000, () => {
    console.log('app is running on port 3000')
})
