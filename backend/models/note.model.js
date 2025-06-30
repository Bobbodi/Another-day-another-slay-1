const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { type: String , required: true},
    content: { type: String  },
    priority: { type: Number, default: 10 },
    dueDate: { type: Date, default: null},
    tags: { type: [String], default:[]  },
    isDone: { type: Boolean, default: false },
    whenDone: { type: Date, default: null },
    isEvent: { type: Boolean, default: false },
    userId: { type: String , required: true},
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Note", noteSchema);

