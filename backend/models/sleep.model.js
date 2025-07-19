const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sleepSchema = new Schema({
    sleepStart: { type: Date, required: true},
    sleepEnd: { type: Date, required: true},
    dreams: { type: String },

    userId: { type: String , required: true},
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Sleep", sleepSchema);

