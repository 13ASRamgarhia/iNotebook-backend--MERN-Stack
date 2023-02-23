const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser')
const Note = require('../models/Notes')

require('../db')

//FETCH NOTES (USER LOGIN REQUIRED)
router.get('/api/fetchNotes', fetchUser, async (req, res) => {
    let notes = []
    try{
        notes = await Note.find({user: req.user});
        res.send(notes)
    }
    catch(error){
        res.send(error.message)
    }
})

//ADD NEW NOTE (USER LOGIN REQUIRED)
router.post('/api/newNote', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body

    if(!title){
        return res.send("Please fill title")
    }

    try{
        const note = new Note({title, description, tag, user: req.user})
        note.save()
        res.send("Note added successfully")
    }
    catch(error){
        res.send(error.message)
    }
})

//EDIT NOTE (USER LOGIN AND NOTE ID REQUIRED)
router.put('/api/editNote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body
    const newNote = {}

    if(title){newNote.title = title}
    if(description){newNote.description = description}
    if(tag){newNote.tag = tag}

    let note = await Note.findById(req.params.id);

    if(!note){
        returnres.send("Not found")
    }

    if(note.user.toString() !== req.user){
        return res.send("Invalid user")
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note)
})

//DELETE NOTE (USER LOGIN AND NOTE ID REQUIRED)
router.delete('/api/deleteNote/:id', fetchUser, async (req, res) => {
    try{
        let note = await Note.findById(req.params.id);

        if(!note){
            return res.send("Not found")
        }
        if(note.user.toString() !== req.user){
            return res.send("Invalid user")
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.send("successfully deleted")
    }
    catch(error){
        res.send('internal server error ' + error.message)
    }

})

module.exports = router