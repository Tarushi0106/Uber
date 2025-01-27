const rideService = require('../services/ride.service');
const { validationResult } = require('express-validator');
const {mapService} = require('../services/maps.service');
const {sendMessageToSockekId} = require('../socket');
const {rideModel} = require('../models/ride.model');
module.exports.createRide = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {userId, pickup , destination , vehicleType} = req.body;
    try{
        const ride = await rideService.createRide({user: req.user._id ,pickup , destination , vehicleType});
         res.status(201).json(ride);
         const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
         console.log(pickupCoordinates);
    
    const captainsInRadius = await mapService.getCaptainsInTheRadius(pickupCoordinated.ltd,pickupCoordinated.lng, 2);
rode.otp = "" ;  
const rideWithUser= await rideModel.findOne({_id:ride._id}).populate('user');
captainsInRadius.map(captain =>{
    sendMessageToSockekId(captain.socketId, {
        event: 'new-ride',
        data: ride
    });
})

}
    catch{
        return res.status(404).json({message: 'Ride not created'});
    }
}

module.exports.getFare = async (req, res) => {
const errors = validationResult(req);
if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
}
const {pickup, destination} = req.query;
try{
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
 }
  catch(err){
        return res.status(404).json({message: 'Fare not found'});
    }

}