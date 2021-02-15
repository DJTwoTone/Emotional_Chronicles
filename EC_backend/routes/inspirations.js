//add express custom errors

const express = require('express');
const ExpressError = require('../helpers/ExpressError');
const Inspirations = require('../models/inspirations');
const { authUser, authAdmin } = require('../middleware/auth');

const router = express.Router();


//inspirations routes

router.get('/inspirations/:num?', async function (req, res, next) {
    try {
        
        const num = req.params.num || 1;

        const inspirations = await Inspirations.getInspirations(num);

        return res.json({ inspirations })

    } catch (e) {
        return next(e);
    }
})

router.get('/inspirations/flagged', async function(req, res, next) {
    try {

        const inspirations = await Inspirations.getFlaggedInspirations();

        return res.json({ inspirations })
        
    } catch (e) {
        return next(e);
    }
})



router.post('/inspirations', authUser, async function (req, res, next) {
    try {
        const inspiration = req.body.inspiration;

        const flagged = req.body.is_admin ? false : true;

        const addedInspiration = await Inspirations.addInspiration(inspiration, flagged);

        return res.json({ addedInspiration });

    } catch (e) {
        return next(e);
    }
})

router.patch('/inspirations/:id', authUser, async function (req, res, next) {
    try {
        
        const id = req.params.id;

        const changeFlagTo = req.body.is_admin ? true : false;

        const inspiration = await Inspirations.changeInspirationFlag(id, changeFlagTo);

        return res.json({ inspiration });

    } catch (e) {
        return next(e);
    }
})

router.delete('/inspirations/:id', authAdmin, async function (req, res, next) {
    try {

        const id = req.params.id;

        await Inspirations.deleteInspiration(id);

        return res.json({ message: 'The inspiration has been deleted' })
        
    } catch (e) {
        return next(e);
    }
})

module.exports = router;




