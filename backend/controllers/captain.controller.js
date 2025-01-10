const captainModel = require('../models/captain.model');
const captainService = require('../services/captain.service');
const {validationResult} = require('express-validator');

module.exports.registerCaptain = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { fullname, email, password, vehicle } = req.body;
        const isCaptainAlreadyExists = await captainModel.findone({email});
        if (isCaptainAlreadyExists){
            return res.status(400).json({message:'captain already exists'})
        }
        const hashedPassword = await userModel.hashPassword(password);

        const user = await CaptainService.createUser({
            firstname: fullname.firstname,
            lastname: fullname.lastname,
            email,
            password: hashedPassword,
            color: vehicle.color,
            plate: vehicle.plate,
            capacity: vehicle.capacity,
            vehicleType: vehicle.vehicleType,
        });

        const token = user.generateAuthToken();
        res.status(201).json({ token, user });
    } catch (error) {
        console.error("Error in registerUser:", error.message);
        res.status(500).json({ error: error.message });
    }
};

module.exports.loginCaptain= async (req,res,next) =>{
    const errors= validationResult(req);
    if(!errors.isEmpty()){
return res.status(400).json({errors:errors.array()});
    }
    const {email , password} = req.body;
    const captain = await captainModel.findOne ({email}).select('+password');
    if(!captain){
        return res.status(401).json({message:'invalid email or password'});
    }
    const isMatch = await captain.comparePassword(password);
    if(!isMatch){
        return res.status(401).json({message:'invalid email or password'});
    }
    const token = captain.generateAuthToken();
    res.cookie('token',token)
    res.status(200).json({token,captain});
}

module.exports.getCaptainProfile = async (req , res , next)=>{
    return res.status(200).json({captain : req.captain});
}

module.exports.logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await blackListTokenModel.create({ token });

    res.clearCookie('token');

    res.status(200).json({ message: 'Logout successfully' });
}