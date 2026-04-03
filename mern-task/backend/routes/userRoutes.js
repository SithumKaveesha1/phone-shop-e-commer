const express = require('express');
const router = express.Router();
const User = require('../models/User');

// @desc    Create new user
// @route   POST /api/users
router.post('/', async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Get all users
// @route   GET /api/users
router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
router.put('/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(user);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
router.delete('/:id', async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
