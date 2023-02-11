const mongoose = require("mongoose")

const date = new Date();
let dateAsText = date.toString();
let noteDate = dateAsText.slice(4,24)

const notesSchema = mongoose.Schema({
    title:{
        type: String,
    },
    description:{
        type: String,
    },
    tag:{
        type: String,
        default: "General"
    },
    date:{
        type:String,
        default: noteDate
    },
    user:{
        type: String,
        required: true
    }
})

const Note = mongoose.model("notes", notesSchema)

module.exports = Note;