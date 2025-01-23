const express = require('express');
const router = express.Router();
const Book = require('../models/bookModel');
const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

router.get('/', checkAuth, async (req, res) => {
    try {
        const books = await Book.find({}).populate('author');
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', checkAuth, async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findById(id).populate('author');
        if (!book) {
            return res.status(404).json({ message: `Can't find any book with this ID!` });
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(200).json({ message: "Book added successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndUpdate(id, req.body);
        if (!book) {
            return res.status(404).json({ message: `Can't find any book with this ID!` });
        }
        const updatedBook = await Book.findById(id).populate('author');
        res.status(200).json({ message: "Book updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const {id} = req.params;
        const book = await Book.findByIdAndDelete(id);
        if (!book) {
            return res.status(404).json({ message: `Can't find any book with this ID!` });
        }
        res.status(200).json({ message: "Book deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
