const express = require('express')
const router = express.Router();

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const profileModel = require('../models/profile-model');

router.post('/',async (req,res)=>{
    try{
        const email = req.body.email;
        const phone = req.body.phone;
        const password = req.body.password;

        if(email && phone){
            res.send(false);
        }
        else{

        if(!email){
        var userData = await profileModel.findOne({$or:[{phone:phone}]});}
        if(!phone){
        var userData = await profileModel.findOne({$or:[{email:email}]});}
        const passCheck = await bcrypt.compare(password,userData.password)
        if(passCheck){
            let payload = { subject : userData._id}
            let token = jwt.sign(payload,'secretKey')
            userData.token = token;
            res.send(userData);
        }else{
            res.send(false);
        }
    }

    }catch(err){
        res.send(false);
    }


});

module.exports = router;