const mongoose = require('mongoose')
// const dbConnection = require('../Connection/database.js');
// dbConnection();
const productSchema = new mongoose.Schema({
    productName: String,
    productId: [{
        type: Number,
        unique: [true,'Unique ProductId Required']
    }],
    image: String,
    description: String,
    quantity: Number,
    price: Number,
});

const ProductModel = new mongoose.model("Product", productSchema);
module.exports = ProductModel;