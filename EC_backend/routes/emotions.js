//add express custom errors

const express = require('express');
// const ExpressError = require('../helpers/ExpressError');
const Emotions = require('../models/emotions');
// const { authUser, authAdmin } = require('../middleware/auth');

const router = express.Router();

//emotions routes

router.get('/:num?', async function (req, res, next) {
    try {
        const num = req.params.num || 1;

        
        const emotions = await Emotions.getEmotions(num);
        
        console.log('in the get request', emotions)
        return res.json({emotions});
        
    } catch (e) {
        return next(e)
    }
})


module.exports = router;




