const express = require('express')
const router = express.Router();

const ProductModel = require('../models/product-model');

router.get('/', (req, res) => {
    ProductModel.find((err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send(err); }
    })

})

router.post('/', (req, res) => {
    let product = new ProductModel({
        productName: req.body.productName,
        productId: req.body.productId,
        image: req.body.image,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price
    })
    product.save()
        .then(() => { res.send(profile); })
        .catch((err) => { console.log(err); });
})
module.exports = router;