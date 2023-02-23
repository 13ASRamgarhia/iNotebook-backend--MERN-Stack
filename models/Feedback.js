const mongoose = require('mongoose')

const date = new Date();
let dateAsText = date.toString();
let feedbackDate = dateAsText.slice(4,24)

const feedbackSchema = mongoose.Schema({
    name: {
        type: String
    },
    feedback: {
        type: String
    },
    rating: {
        type: Number
    },
    date: {
        type: String,
        default: feedbackDate
    }
})

const Feedback = mongoose.model("feedback", feedbackSchema)

module.exports = Feedback