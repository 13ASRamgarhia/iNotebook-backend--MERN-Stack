const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")
const dotenv = require("dotenv")

try{
dotenv.config({path: "./CONFIG.env"})

const PORT = process.env.PORT
const app = express()
const db = mysql.createConnection({
    host:`0.0.0.0`,
    user:"root",
    password:"45632589",
    database:"notesschema"
})
app.use(express.json())
app.use(cors())

try{
    app.listen(PORT, () => {
        console.log(`Connection established. Listening on PORT. ${PORT}`)
    })
}
catch(error){
    console.log("error!!!")
    console.error(error.message)
}

//Welcome message
app.get("/", (req,res) => {
    res.json("Welcome to the Notes server")
})

//================================= notes API =================================
//Fetch all notes
app.get("/notes", (req,res) => {
    const q = "SELECT * FROM notes"

    db.query(q, (error, data) => {
        if(error){
            return res.json(error.message)
        }
        return res.json(data)
    })
})

app.post("/newNote", (req,res) => {
    const q = "INSERT INTO notes (`title`,`description`,`date`) VALUES (?)"
    const dateAsNum = new Date();
    let dateAsText = dateAsNum.toString();
    let noteDate = dateAsText.slice(4,24)
    const values = [
        req.body.title,
        req.body.description,
        noteDate
    ]

    try{
    
    db.query(q,[values], (error, data) => {
        if(error){
            return res.json(error.message)
        }
        return res.json(data)
    })
    }
    catch(error){
        res.status(400).json(error.message)
    }
})

app.delete("/deleteNote/:id", (req,res) => {
    const noteId = req.params.id;
    const q = 'DELETE FROM notes WHERE id = ?';

    db.query(q, [noteId], (err, data) => {
        if(err){
            return console.log(err.message)
        }
        return res.json("Deleted")
    })

})


//================================= users API =================================
//Fetch all users
app.get("/users", (req,res) => {
    const q = "SELECT * FROM users"

    db.query(q, (error, data) => {
        if(error){
            return res.json(error.message)
        }
        return res.json(data)
    })
})

//Add a user
app.post("/newUser", async (req, res) => {
    try{
        const q = "INSERT INTO users (`fullName`,`email`,`password`) VALUES (?)"
    const values = [
        req.body.fullName,
        req.body.email,
        req.body.password
    ]
        db.query(q,[values], (error, data) => {
        if(error){
            return res.json(error.message)
        }
        return res.json(data)
    })
    }
    catch(error){
        res.status(400).json(error.message)
    }
})
}
catch(err){console.log(err.message)}