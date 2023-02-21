const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")
require("./db")

dotenv.config({path: "./CONFIG.env"})

const PORT = process.env.PORT

const app = express()
app.use(cors({
    "origin": "https://inotebook-cloud-notebook-app.netlify.app/",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  }))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`iNotebook server listening at PORT.${PORT}`)
})

app.get("/", (req, res) => {
    res.status(200).json({
        "message": "Welcome to iNotebook",
        "about": "Notebook on cloud - A React app developed using MERN Technologies",
        "createdBy": "Amandeep Singh",
        "developedin": "Jan 2023",
        "features": {
            "userFriendly": true,
            "dataSecurity": true,
            "unlimitedNotes": true,
            "themes": "dark/light mode",
        },
        "requirements": {
            "Device with internet connection": true,
            "pen and paper": false
        },
        "developerProfile": "https://www.linkedin.com/in/13asr/"
    })
})

app.use(require("./router/auth"))
app.use(require("./router/notes"))
app.use(require("./router/feedback"))