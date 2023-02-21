const express = require("express")
const router = express.Router()
require("../db")

const Feedback = require("../models/Feedback")

//FEEDBACK API
router.post("/api/feedback", async (req, res) => {
    const { name, feedback, rating } = req.body

    if(!name && !feedback && !rating){
        return res.status(422).json({error: "Feedback cannot be empty"})
    }

    const feed = new Feedback({name, feedback, rating})
    await feed.save()
    .then(() => {
        res.header("Access-Control-Allow-Origin", "*")
        res.header("Access-Control-Allow-Headers", "X-Requested-With")
        res.status(200).send("Feedback submitted")
    }) 
    .catch(() => {res.status(500).send("Failed to submit feedback. Please try again later")})
})

module.exports = router