const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type:String,
            required:true,
            minlength:[3,'first name must be of 3 characters']

        },
        lastname:{
            type:String,
            minlength:[3,'last name must be of 3 characters']
        }
    },
    email:{
        type:String,
            required:true,
            unique:true,
            minlength:[5,'Email must be of 5 characters']
    },
    password:{
        required:true,
        unique:true,
        type:String,
        select : false,
    },
    sockedId:{  // for live tracking !!
        type:String,
    }
})

userSchema.methods.generateAuthToken = function(){
const token = jwt.sign({_id: this._id } , process.env.JWT_SECRET , {expiresIn:'24hr'})
return token;
}
userSchema.methods.comparepasswords = async function(password){
    return await bcrypt.compare(password, this.password);
}
userSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password , 10);
}
const userModel = mongoose.model('user',userSchema );
module.exports= userModel;