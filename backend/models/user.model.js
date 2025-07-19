const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName: { type: String },
    email: { type: String },
    password: { type: String },
    avatar: { type: Number, default: 1}, //default = 1 means DOG 

    createdOn: { type: Date, default: new Date() },
});

module.exports = mongoose.model("User", userSchema);

