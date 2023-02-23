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
        console.error(error.message)
        res.status(400).send({error: error})
    }
})

//ADD NEW NOTE (USER LOGIN REQUIRED)
router.post('/api/newNote', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body

    if(!title){
        return res.status(400).send({error: "Please fill title"})
    }

    try{
        const note = new Note({title, description, tag, user: req.user})
        note.save()
        res.send(`A addedd sucuce`)
    }
    catch(error){
        console.error(error.message)
        res.status(400).send({error: error})
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
        return res.status(404).json({error: "Not found"})
    }

    if(note.user.toString() !== req.user){
        return res.status(401).json({error: "Invalid user"})
    }

    note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true})
    res.json(note)
})

//DELETE NOTE (USER LOGIN AND NOTE ID REQUIRED)
router.delete('/api/deleteNote/:id', fetchUser, async (req, res) => {
    try{

    }
    catch(error){
        res.status(500).json({error: 'internal server error', message: error.message})
    }
        let note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({error: "Not found"})
        }
        if(note.user.toString() !== req.user){
            return res.status(401).json({error: "Invalid user"})
        }

        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success": "successfully deleted"})
})

module.exports = router