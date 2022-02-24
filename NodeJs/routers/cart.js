const express = require('express')
const router = express.Router();

const CartProductModel = require('../models/cart-model');
const ProductModel = require('../models/product-model');

router.get('/:profileId', async (req, res) => {
    try {
        const profileId = req.params.profileId;
        // const cartProduct = await CartProductModel.find({ profileId: profileId }, { productId: 1, _id: 0 });
        // const allProductIds = cartProduct.map(obj =>obj.productId); [1,5,7]
        // const cartProductData = await ProductModel.find({productId:{$in:allProductIds}});
        // const ProductDataForCart = await ProductModel.find({productId:{$in:allProductIds}},{quantity:0});
        // allProductIds.forEach(element => {
        //     let qty = CartProductModel.find({productId: element},{quantity:1}) 
        //     console.log("qty"+qty);
        //     ProductDataForCart.updateOne({ productId: element},[{ $set: {quantity:11000} }],{ new: true });       
        // });
        // console.log(ProductDataForCart); //data without quantity

        const cartProduct = await CartProductModel.find({ profileId: profileId });
        res.send(cartProduct); 
        console.log(cartProduct); 


    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.post('/',async (req, res) => {
    try {
    let count = await CartProductModel.find({productId: req.body.productId, profileId:req.body.profileId},{quantity:1})
    let getProductName = await ProductModel.find({productId: req.body.productId})
    if(!count.length){
        let cartProduct = new CartProductModel({
            productId: req.body.productId,
            profileId:req.body.profileId,
            productName:getProductName[0].productName,
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

router.delete('/:productId',async (req,res)=>{
    try{
        CartProductModel.deleteOne({ productId: req.params.productId },async (err,doc)=>{
            if(!err){ res.send(doc)}
            else{ res.send()}
        })
    }
    catch(err){
        res.send(err)
    }
})

module.exports = router;