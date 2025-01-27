const { validationResult } = require('express-validator');
const userModel = require('../models/user.model');
const userService = require('../services/user.service'); // Ensure userService is imported
const blackListTokenModel = require('../models/blacklistToken.model');

module.exports.registerUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password } = req.body;

        const isUserAlready = await userModel.findOne({ email });

        if (isUserAlready) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await userModel.hashPassword(password);

        const user = await userService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
        });

        const token = user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (error) {
        console.error('Error registering user:', error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports.loginUser = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = user.generateAuthToken();
        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error in loginUser:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports.getUserProfile = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await blackListTokenModel.create({ token });
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        console.error("Error in getUserProfile:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports.logoutUser = async (req, res, next) => {
    try {
        res.clearCookie('token');
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await blackListTokenModel.create({ token });
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        console.error("Error in logoutUser:", error.message);
        res.status(500).json({ error: error.message });
    }
};