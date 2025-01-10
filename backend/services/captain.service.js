const captainModel = require('../models/captain.model');

// Creating user :)
module.exports.createCaptain = async ({ firstname, lastname, password, email, color , plate , capacity , vehicleType }) => {
    if (!firstname || !email || !password || !color || !plate|| !capacity || !vehicleType) {
        throw new Error("All fields are required");
    }

    const captain = await userModel.create({ 
        fullname: {
            firstname,
            lastname,
        },
        email,
        password, 
        vehicle:{
            color , plate , capacity , vehicleType
         }

    });

    return user;
};
