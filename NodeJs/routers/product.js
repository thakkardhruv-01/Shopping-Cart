const express = require('express')
const router = express.Router();

const ProductModel = require('../models/product-model');
const CountModel = require('../models/counter-model');
const profileModel = require('../models/profile-model')

router.get('/', (req, res) => {
    ProductModel.find((err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send(err); }
    })

})

router.get('/admin/:profileId',async (req,res)=>{
    try { 
        const profileId = req.params.profileId;
        var productData = await ProductModel.find({profileId:profileId});
        res.send(productData);
        
    } catch (err) {
        res.send(err);
        console.log(err);
    }
});

router.post('/', async (req, res) => {

    try {
        var id;
        const counts = await CountModel.find({});
        console.log(counts[0].productId);
        if(counts[0].productId==undefined){
            id=1;
            oldId = counts[0].profileId;
            await CountModel.updateOne({ profileId: oldId }, [{ $set: { productId: id } }], { new: true });

        }else{
        oldId = counts[0].productId;
        id = oldId + 1;
        await CountModel.updateOne({ productId: oldId }, [{ $set: { productId: id } }], { new: true });
    }

    } catch (e) {
        console.log(e);
    }

    let product = new ProductModel({
        productName: req.body.productName,
        productId: id,
        image: req.body.image,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        profileId:req.body.profileId
    })
    product.save()
        .then(() => { res.send(product); })
        .catch((err) => { console.log(err); });
})
module.exports = router;