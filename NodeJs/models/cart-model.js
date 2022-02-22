const mongoose = require('mongoose')
// const dbConnection = require('../Connection/database.js');
// dbConnection();
const cartProductSchema = new mongoose.Schema({
    productId:Number,
    profileId:Number,
});

const CartProductModel = new mongoose.model("CartProduct", cartProductSchema);
module.exports = CartProductModel;