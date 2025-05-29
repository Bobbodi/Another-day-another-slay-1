const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const journalSchema = new Schema({
    entry: { type: String },

    userId: { type: String , required: true},
    createdOn: { type: Date, default: new Date().getTime() },
});

module.exports = mongoose.model("Journal", journalSchema);

