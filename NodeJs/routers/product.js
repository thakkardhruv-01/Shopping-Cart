const express = require('express')
const router = express.Router();

const multer = require('multer');
const path = require('path');

const ProductModel = require('../models/product-model');
const CountModel = require('../models/counter-model');
const profileModel = require('../models/profile-model');
const CartProductModel = require('../models/cart-model');
const { accessSync } = require('fs');
//const imgPath = console.log(path.join(__dirname,"../public/upload"));

router.use(express.static(__dirname + "./public"))

var Storage = multer.diskStorage({
    destination: './public/uploads',
    filename: (res, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
});

var upload = multer({
    storage: Storage
}).single('image')

router.get('/', (req, res) => {
    ProductModel.find({status:'Active'},(err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send(err); }
    })

})
//localhost:3000/product/admin/:profileId
router.get('/admin/:profileId', async (req, res) => {
    try {
        const profileId = req.params.profileId;
        var productData = await ProductModel.find({ profileId: profileId });
        res.send(productData);

    } catch (err) {
        res.send(err);
        console.log(err);
    }
});
//localhost:3000/product/edit/:productId
router.get('/edit/:productId', async (req, res) => {
    try {
        const productId = req.params.productId;
        var productData = await ProductModel.findOne({ productId: productId });
        res.send(productData);

    } catch (err) {
        res.send(err);
        console.log(err);
    }
});
//localhost:3000/product/:productId
router.delete('/:productId', async (req, res) => {
    console.log(req.params.productId);
    ProductModel.deleteOne({ productId: req.params.productId }, async (err, doc1) => {
        if (!err) {
            let c = await CartProductModel.find({ productId: req.params.productId })
            if (c.length > 0) {
                CartProductModel.deleteMany({ productId: req.params.productId }, async (err, doc2) => {
                    if (!err) {
                        console.log(await doc1, await doc2)
                        res.send()
                    }
                    else { console.log("deleting err from cart"); }
                })
            }
            else{
                res.send(doc1)
            }
        }
        else { console.log("deleting err from products"); }
    })
})

router.post('/', upload, async (req, res) => {

    try {
        var id;
        const counts = await CountModel.find({});
        console.log(counts[0].productId);
        if (counts[0].productId == undefined) {
            id = 1;
            oldId = counts[0].profileId;
            await CountModel.updateOne({ profileId: oldId }, [{ $set: { productId: id } }], { new: true });

        } else {
            oldId = counts[0].productId;
            id = oldId + 1;
            await CountModel.updateOne({ productId: oldId }, [{ $set: { productId: id } }], { new: true });
        }

    } catch (e) {
        console.log(e);
    }
    const d = new Date().toDateString()
    const sellerName = await profileModel.find({profileId: req.body.profileId},{name:1})
    console.log(typeof sellerName[0]['name']);
    let product = new ProductModel({
        productName: req.body.productName,
        productId: id,
        image: req.body.image,
        description: req.body.description,
        quantity: req.body.quantity,
        price: req.body.price,
        profileId: req.body.profileId,
        sellerName:sellerName[0]['name'],
        status:req.body.status,
        createdDate: d
    })
    product.save()
        .then(() => { res.send(product); })
        .catch((err) => { console.log(err); });
})
//localhost:3000/product/:productId
router.put("/:productId", async (req, res) => {
    try {
        const productId = req.params.productId;
        let product = {
            productName: req.body.productName,
            image: req.body.image,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            status:req.body.status,
        }
        const updatedProduct = await ProductModel.findOneAndUpdate(productId, { $set: product }, { new: true });
        res.send(updatedProduct);
        updatedProduct.save();
    } catch (err) {
        res.send(err);
        console.log(err);
    }

})

module.exports = router;