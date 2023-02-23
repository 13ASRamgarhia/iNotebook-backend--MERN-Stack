const express = require("express")
const router = express.Router()
require("../db")

const Feedback = require("../models/Feedback")

//FEEDBACK API
router.post("/api/feedback", async (req, res) => {
    const { name, feedback, rating } = req.body

    if(!name && !feedback && !rating){
        return res.send("Feedback cannot be empty")
    }

    const feed = new Feedback({name, feedback, rating})
    await feed.save()
    .then(() => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")
        res.send("Feedback submitted. Thank you")
    }) 
    .catch(() => {res.send("Failed to submit feedback. Please try again later")})
})

module.exports = router