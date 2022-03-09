const express = require('express')
const router = express.Router();

const profileModel = require('../models/profile-model');
const CountModel = require('../models/counter-model');

router.get('/:profileId', (req, res) => {
    console.log(req.params.profileId)
    profileModel.find({ profileId: req.params.profileId }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send(err); }
    })
})

router.post('/', async (req, res) => {
    const count = await profileModel.find({ $or: [{ phone: req.body.phone }, { email: req.body.email }] })
    if (!count.length) {
        try {
            var id;
            const counts = await CountModel.find({});
            if (counts.length == 0) {
                id = 1;

                let newId = new CountModel({
                    profileId: id
                });
                newId.save()
                    .then(() => { })
                    .catch((err) => { console.log(err); });
            }
            else {
                console.log("else called");
                oldId = counts[0].profileId;
                id = oldId + 1;

                await CountModel.updateOne({ profileId: oldId }, [{ $set: { profileId: id } }], { new: true });
            }
        } catch (e) {
            console.log(e);
        }

        let profile = new profileModel({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            role: req.body.role,
            password: req.body.password,
            profileId: id
        });
        profile.save()
            .then(() => { res.send(profile); })
            .catch((err) => { console.log(err); });
    } else {
        res.send(false);
    }

})

router.get('/count', (req, res) => {
    CountModel.find((err, doc) => {
        if (!err) { res.send(doc); }
        else { res.send(err) }
    })
})

module.exports = router;