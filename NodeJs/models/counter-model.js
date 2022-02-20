const mongoose = require('mongoose')
// const dbConnection = require('../Connection/database.js');
// dbConnection();
const countSchema = new mongoose.Schema({
    productId:Number,
    profileId:Number
});

const CountModel = new mongoose.model("Count", countSchema);
module.exports = CountModel;
