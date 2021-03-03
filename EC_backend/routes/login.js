const express = require('express');
const User = require('../models/user');
const createToken = require('../helpers/authToken');

const router = new express.Router();

router.get('/login', async function(req, res, next) {
    try {
        console.log('logging in')
        const user = await User.authenticate(req.body);
        const token = createToken(user);
        return res.json({ token })
    } catch (e) {
        return next(e);
    }
})

module.exports = router;