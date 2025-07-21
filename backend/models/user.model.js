const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    avatar: { type: Number, default: 1 }, //range from 1 to 10 
    studyroom: { type: Number, default: 1 },
    createdOn: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);

