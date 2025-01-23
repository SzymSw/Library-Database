const express = require('express');
const router = express.Router();
const Loan = require('../models/loanModel');
const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

router.get('/', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const loans = await Loan.find({})
        .populate('user', 'firstName lastName')
        .populate('book', 'title');
        res.status(200).json(loans);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const {id} = req.params;
        const loan = await Loan.findById(id)
        .populate('user', 'firstName lastName')
        .populate('book', 'title');
        if (!loan) {
            return res.status(404).json({ message: `Can't find any loan with this ID!` });
        }
        res.status(200).json(loan);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const loan = await Loan.create(req.body);
        res.status(200).json({ message: "Loan added successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const {id} = req.params;
        const loan = await Loan.findByIdAndUpdate(id, req.body);
        if (!loan) {
            return res.status(404).json({ message: `Can't find any loan with this ID!` });
        }
        const updatedLoan = await Loan.findById(id)
        .populate('user', 'firstName lastName')
        .populate('book', 'title');
        res.status(200).json({ message: "Loan updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const { id } = req.params;
        const loan = await Loan.findByIdAndDelete(id);
        if (!loan) {
            return res.status(404).json({ message: `Can't find any loan with this ID!` });
        }
        res.status(200).json({ message: "Loan deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;