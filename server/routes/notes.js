const express = require("express");
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes');
const { body, validationResult } = require('express-validator');


// Get all the notes using GET
router.get("/fetchallnotes", fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.status(200).json(notes)
    }
    catch (error) {
        console.error(error.message);
        res.send(error);
    }
});


// Add a new note using POST 
router.post("/addnote", fetchuser, [
    body("title", "Title must be atleast 3 characters").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;

        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        });

        const savedNote = await note.save();

        res.status(201).json(savedNote);
    }
    catch (error) {
        console.error(error.message);
        res.send(error);
    }
});

// Update an existing Note
// We can use POST also but genrally is done with PUT request
// id li specific wahi user ki note update ho
router.put("/updatenote/:id", fetchuser, async (req, res) => {
    try {
        const { title, description, tag } = req.body;
        const newNote = {};
        if (title) {
            newNote.title = title;
        }
        if (description) {
            newNote.description = description;
        }
        if (tag) {
            newNote.tag = tag;
        }

        // Finding the note to be updated
        let note = await Notes.findById(req.params.id);

        // If note does not exist which we are finding
        if (!note) { return res.status(404).send("Not Found") };

        // Logged person trying to access someone else's note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        };

        // If above two constions are not met then update the note
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
        res.status(200).json({ note });
    }
    catch (error) {
        console.error(error.message);
        res.send(error);
    }
});

// Delete an existing Note using DELETE request
// id li specific wahi user ki note update ho
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
    try {
        let note = await Notes.findById(req.params.id);

        if (!note) { return res.status(404).send("Not Found") };

        // Logged person trying to access someone else's note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed")
        };

        // If above two constions are not met then update the note
        await Notes.findByIdAndDelete(req.params.id)
        res.status(200).json({ "Sucess": "Note has been deleted" });
    }
    catch (error) {
        console.error(error.message);
        res.send(error);
    }
});

module.exports = router;