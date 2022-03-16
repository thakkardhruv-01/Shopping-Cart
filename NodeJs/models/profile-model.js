const mongoose = require('mongoose')
const dbConnection = require('../Connection/database.js');
dbConnection();

const bcrypt = require('bcryptjs')

const profileSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    role:String,
    password:String,
    profileId:Number,
    token:String
});

profileSchema.pre("save",async function(next){
    this.password = await bcrypt.hash(this.password,10)
    next();
})

const ProfileModel = new mongoose.model("Profile",profileSchema);
module.exports = ProfileModel;