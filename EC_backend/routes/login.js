const express = require('express');
const User = require('../models/user');
const createToken = require('../helpers/authToken');

const router = new express.Router();

router.post('/login', async function(req, res, next) {
    try {
        
        const user = await User.authenticate(req.body);
        const token = createToken(user);
        return res.json({ token })
    } catch (e) {
        return next(e);
    }
})

module.exports = router;