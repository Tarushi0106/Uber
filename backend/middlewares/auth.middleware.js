const userModel = require('../models/user.model');
const blackListTokenModel = require('../models/blacklistToken.model');
const jwt = require('jsonwebtoken');

module.exports.authUser = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized user" });
    }

    const isBlacklisted = await blackListTokenModel.findOne({ token: token });
    if (isBlacklisted) {
        return res.status(401).json({ message: 'Unauthorized user' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Unauthorized user" });
    }
};

module.exports.authCaptain = async(req, res, next)=>{
    const token = req.cookies.token || req.headers.authorization?.split('')[1];
    if(!token){
        return res.status(401).json({message:"Unauthorised captain"});
    }

    const isBlacklisted = await userModel.findOne({token:token})
    if(isBlacklisted){
return res.status(401).json({message:'Unauthorized captain'})
    }
    try{
const decoded = jwt.verify(token , process.env.JWT_SECRET);
const captain = await userModel.findById(decoded._id)
req.user = captain;
return next();
    }
    catch(err){
        return res.status(401).json({message:"Unauthorised captain"});
    }
}