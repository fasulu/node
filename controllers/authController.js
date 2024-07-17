const userModel = require('../models/userModel');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const signUp = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);

        // Check if user already exists
        const existingUser = await userModel.findOne({ username });
        if (existingUser) {
            return res.status(400).send('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({ username, password: hashedPassword });

        await newUser.save();
        res.status(201).send('New user added');

    } catch (error) {
        res.status(500).send('Error while adding new user');
    }
}

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body);

        // Check if the user exists
        const user = await userModel.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate JWT
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).json({ message: "There is an error while treating the request" })
    }
}

module.exports = { signUp, login }