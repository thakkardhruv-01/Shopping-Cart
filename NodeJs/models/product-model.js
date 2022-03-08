const mongoose = require('mongoose')
// const dbConnection = require('../Connection/database.js');
// dbConnection();
const productSchema = new mongoose.Schema({
    productName: String,
    productId: Number,
    image: String,
    description: String,
    quantity: Number,
    price: Number,
    profileId:Number,
    sellerName:String,
    status:String,
    createdDate:String
});

const ProductModel = new mongoose.model("Product", productSchema);
module.exports = ProductModel;