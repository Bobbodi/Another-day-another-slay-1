const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const friendsSchema = new Schema({
    person1: { type: String , required: true},
    person2: { type: String , required: true},
    status: { type: Number, default: 0 }, // 1: pending friend request, 2: friends
});

module.exports = mongoose.model("Friends", friendsSchema);

