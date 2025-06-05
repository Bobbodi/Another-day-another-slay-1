const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studyRoomSchema = new Schema({
    room: { type: String },

    owner: { type: String , required: true}, //if there's a group, all have their own db entry as owner
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("StudyRoom", studyRoomSchema);

