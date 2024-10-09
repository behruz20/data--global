const User = require('../models/User');

const createUser = async (req, res) => {
    const { name, surname, gmail } = req.body;

    if (!name || !surname || !gmail) {
        return res.status(400).json({ message: 'Bad Request: Missing data' });
    }

    try {
        const newUser = new User({ name, surname, gmail });
        await newUser.save();
        res.json({ data: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json({ data: users });
    } catch (err) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { createUser, getUsers };
