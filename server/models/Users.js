const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: String, 
    password: String
})

const itemModel = mongoose.model('User', itemSchema);

module.exports = itemModel;