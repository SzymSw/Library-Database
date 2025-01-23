const express = require('express');
const router = express.Router();
const Author = require('../models/authorModel');
const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

router.get('/', async (req, res) => {
    try {
        const authors = await Author.find({})
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findById(id)
        if (!author) {
            return res.status(404).json({ message: `Can't find any author with this ID!` });
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const author = await Author.create(req.body);
        res.status(200).json({ message: "Author added successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findByIdAndUpdate(id, req.body);
        if (!author) {
            return res.status(404).json({ message: `Can't find any author with this ID!` });
        }
        const updatedAuthor = await Author.findById(id)
        res.status(200).json({ message: "Author updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const {id} = req.params;
        const author = await Author.findByIdAndDelete(id);
        if (!author) {
            return res.status(404).json({ message: `Can't find any author with this ID!` });
        }
        res.status(200).json({ message: "Author deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;