const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const blackListTokenModel = require('../models/blackListToken.model');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

// Function to register a new captain
module.exports.registerCaptain = async (req, res, next) => {
  try {
    // Validate input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { firstname, lastname, email, password, color, plate, capacity, vehicleType } = req.body;

    // Check if captain already exists
    const isCaptainAlreadyExists = await captainModel.findOne({ email });
    if (isCaptainAlreadyExists) {
      console.error('Captain already exists with email:', email);
      return res.status(400).json({ message: 'Captain already exists' });
    }

    // Hash password
    if (!captainModel.hashPassword) {
      throw new Error('hashPassword method is missing in captainModel');
    }
    const hashedPassword = await captainModel.hashPassword(password);

    // Create new captain
    const newCaptain = await captainService.createCaptain({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      color,
      plate,
      capacity,
      vehicleType,
    });

    // Generate a token
    const token = jwt.sign({ _id: newCaptain._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ token, captain: newCaptain });
  } catch (error) {
    console.error('Error in registerCaptain:', error.stack); // Added stack trace for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to log in captain
module.exports.loginCaptain = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.error('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // Check if captain exists
    const captain = await captainModel.findOne({ email }).select('+password'); // Ensure `password` is select-able
    if (!captain) {
      console.error('Invalid email or password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await captain.comparePasswords(password);
    if (!isMatch) {
      console.error('Invalid email or password');
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Generate a token
    const token = captain.generateAuthToken();

    res.cookie('token', token, { httpOnly: true });

    res.status(200).json({ token, captain });
  } catch (error) {
    console.error('Error in loginCaptain:', error.stack); // Added stack trace for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to get captain profile
module.exports.getCaptainProfile = async (req, res, next) => {
  try {
    const captain = await captainModel.findById(req.user._id);
    if (!captain) {
      console.error('Captain not found');
      return res.status(404).json({ message: 'Captain not found' });
    }
    res.status(200).json({ captain });
  } catch (error) {
    console.error('Error in getCaptainProfile:', error.stack); // Added stack trace for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Function to log out captain
module.exports.logoutCaptain = async (req, res, next) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    console.error('Error in logoutCaptain:', error.stack); // Added stack trace for debugging
    res.status(500).json({ error: 'Internal Server Error' });
  }
};