const mongoose = require('mongoose')
const dbConnection = require('../Connection/database.js');
dbConnection();
const profileSchema = new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    role:String,
    password:String,
    profileId:Number,
    token:String
});

const ProfileModel = new mongoose.model("Profile",profileSchema);
module.exports = ProfileModel;