const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const captainSchema = new mongoose.Schema({
    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, "Minimum length must be 3 characters"],
        },
        lastname: {
            type: String,
            minlength: [3, "Minimum length must be 3 characters"],
        }
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email']
    },
    password:{
        type:String ,
        required:true,
        select:false,
    },
    socketId:{
        type:String,
    },
    status:{
        type:String,
        enum:['active','inactive'],
        default:'active',
    },
    vehicle:{
        color:{
            type: String,
            required: true,
            minlength: [3, " color must be of 3 characters"],
        },
        plate:{
            type: String,
            required: true,
            minlength: [3, "plate must be of 3 characters"],
        },
        capacity:{
            type: Number,
            required: true,
            minlength: [3, "capacity must be of 3 characters"],
        },
        vehicleType:{
            type: String,
            required: true,
            minlength: [3, "car",'motarcycle','auto'],
        },
        location:{
            ltd:{
                type:Number,
            },
            lang:{
                type:Number,
            },
        }
    }
});

captainSchema.methods.generateAuthToken=function(){
    const token = jwt.sign({_id:this._id} , process.env.JWT_SECRET,{expiresIn:'24h'})
    return token;
}

    captainSchema.methods.comparepasswords = async function(password){
        return await bcrypt.compare(password, this.password);
    }
    captainSchema.statics.hashPassword = async function(password){
        return await bcrypt.hash(password , 10);
    }
const CaptainModel = mongoose.model('Captain', captainSchema);

module.exports = CaptainModel;
