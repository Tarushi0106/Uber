const rideMode = require('../models/ride.model');
const mapsService = require('./maps.service');
const crypto = require('crypto');

async function getFare(distance, time){
    if(!pickup || !destination){
      throw new Error('Pickup and destination are required');
    }
    const distanceTime = await mapService.getDistanceTime(pickup, destination);
  
      const baseFare = {
          auto: 30,
          car: 50,
          moto: 20
      };
  
      const perKmRate = {
          auto: 10,
          car: 15,
          moto: 8
      };
  
      const perMinuteRate = {
          auto: 2,
          car: 3,
          moto: 1.5
      };
  
  
  
      const fare = {
          auto: Math.round(baseFare.auto + ((distanceTime.distance.value / 1000) * perKmRate.auto) + ((distanceTime.duration.value / 60) * perMinuteRate.auto)),
          car: Math.round(baseFare.car + ((distanceTime.distance.value / 1000) * perKmRate.car) + ((distanceTime.duration.value / 60) * perMinuteRate.car)),
          moto: Math.round(baseFare.moto + ((distanceTime.distance.value / 1000) * perKmRate.moto) + ((distanceTime.duration.value / 60) * perMinuteRate.moto))
      };
  
      return fare;
  
  
  }
  module.exports.getFare = getFare;
function getOtp(num){
    function generationOtp(num){
const otp = crypto.randomInt(Math.pow(10, num - 1), Math.pow(10, num) - 1);
    }
}

module.exports.createRide = async ({ user, pickup, destination, vehicleType }) => {
    if (!user || !pickup || !destination || !vehicleType) {
        throw new Error('All fields are required');
    }
    const fare = await getFare(pickup, destination);
    const ride = new rideMode({
        user,
        pickup,
        destination,
        vehicleType,
        fare: fare[vehicleType],
        status: 'pending',
        createdAt: new Date(),
        otp: getOtp(6),
    });
    await ride.save();
    return ride;
}



module.exports.getFare = getFare;

