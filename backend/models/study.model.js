const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const studySchema = new Schema({
    studyStart: { type: Number, required: true },
    studyEnd: { type: Number, required: true },
    elapsedTime: { type: Number, required: true },
    completedTasks: { type: Object },
    studyRoom: { type: Number, required: true},

    userId: { type: String , required: true },
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Study", studySchema);

