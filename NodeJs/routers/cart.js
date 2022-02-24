const express = require('express')
const router = express.Router();

const CartProductModel = require('../models/cart-model');
const ProductModel = require('../models/product-model');

router.get('/:profileId', async (req, res) => {
    try {
        const profileId = req.params.profileId;
        const cartProduct = await CartProductModel.find({ profileId: profileId }, { productId: 1, _id: 0 });
        const allProductIds = cartProduct.map(obj =>obj.productId);
        const cartProductData = await ProductModel.find({productId:{$in:allProductIds}});
        console.log(allProductIds);
        res.send(cartProductData);

    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.post('/',async (req, res) => {
    try {
    let count = await CartProductModel.find({productId: req.body.productId, profileId:req.body.profileId},{quantity:1})
    if(!count.length){
        let cartProduct = new CartProductModel({
            productId: req.body.productId,
            profileId:req.body.profileId,
            quantity:1
        })
        cartProduct.save()
            .then(() => { res.send(cartProduct); })
            .catch((err) => { console.log(err); });
    }
    else{
        qty = count[0].quantity+1;
        await CartProductModel.updateOne({ productId: req.body.productId, profileId:req.body.profileId},[{ $set: {quantity:qty} }],{ new: true });    
        res.send("update")
    }

    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

module.exports = router;