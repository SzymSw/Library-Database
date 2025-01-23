const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const checkAuth = require('../middleware/checkAuth');
const checkRole = require('../middleware/checkRole');

router.get('/', checkAuth, checkRole("librarian"), async (req, res) => {
    try {
        const users = await User.find({})
        res.status(200).json(authors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', checkAuth, checkRole("admin"), async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ message: `Can't find any user with this ID!` });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/', checkAuth, checkRole("admin"), async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(200).json({ message: "User added successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.put('/:id', checkAuth, checkRole("admin"), async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndUpdate(id, req.body);
        if (!user) {
            return res.status(404).json({ message: `Can't find any user with this ID!` });
        }
        const updatedUser = await User.findById(id)
        res.status(200).json({ message: "User updated successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.delete('/:id', checkAuth, checkRole("admin"), async (req, res) => {
    try {
        const {id} = req.params;
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: `Can't find any user with this ID!` });
        }
        res.status(200).json({ message: "User deleted successfully!" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;