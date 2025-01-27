const express = require('express');
const router = express.Router();
const {body , query}=require('express-validator');
const authMiddleware = require('../middlewares/auth.middleware');
const rideController = require('../controllers/ride.controller');

router.post('/create', authMiddleware.authUser,
    body('userId').isString().isLength({min:3}).withMessage('invalid userId'),
    body('pickUp').isString().isLength({min:3}).withMessage('invalid pickUp address'),
    body('drop').isString().isLength({min:3}).withMessage('invalid destination address'),
     body('vehicleType').isString().isLength({min:3}).withMessage('invalid vehicle type'),
     rideController.createRide
);

router.get('/fare', authMiddleware.authUser,
    body('pickUp').isString().isLength({min:3}).withMessage('invalid pickUp address'),
    body('drop').isString().isLength({min:3}).withMessage('invalid destination address'),
    rideController.getFare
);

module.exports =router;