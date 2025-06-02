const express = require('express');
const Note = require('../models/Note');
const { auth } = require('./user');

const router = express.Router();

router.post('/', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = new Note({ title, content, user: req.user.id });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Error creating note' });
    }
});

router.get('/', auth, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching notes' });
    }
});

router.put('/:id', auth, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        res.json(note);
    } catch (error) {
        res.status(500).json({ message: 'Error updating note' });
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        res.send('Note deleted');
    } catch (error) {
        res.status(500).json({ message: 'Error deleting note' });
    }
});

router.get('/search', auth, async (req, res) => {
    const { q } = req.query;
    try {
        const notes = await Note.find({
            user: req.user.id,
            title: { $regex: q, $options: 'i' }
        });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error searching notes' });
    }
});

module.exports = router;
