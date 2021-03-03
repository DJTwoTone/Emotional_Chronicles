const express = require('express');
const ExpressError = require('../helpers/expressError');
const User = require('../models/user');
const createToken = require('../helpers/authToken');
const { authUser, checkCorrectUser } = require('../middleware/auth')

const router = express.Router();


//add an authuser check  

router.get('/:username', authUser, async function (req, res, next) {
    
    try {
        const username = req.params.username;

        const check = await User.userCheck(username);

        if (!check) {
            throw new ExpressError(`It seems the username "${username}" does not exist`, 404)
        }

        const user = await User.getUser(username);


        return res.json({user})
        
    } catch (e) {
        return next(e)
    }
})

router.post('/', async function (req, res, next) {
    try {
        const username = req.body.username

        const check = await User.userCheck(username);
        
        if (check) {
            throw new ExpressError(`Sorry, but "${username}" is already being used, Please select a different username`, 400);
        } 

        const user = await User.register(req.body);

        const token = createToken(user);
        return res.status(201).json({ token })

    } catch (e) {
        return next(e);
    }
})

router.patch('/:username', checkCorrectUser, async function (req, res, next) {

    try {

        if('username' in req.body) {
            throw new ExpressError("Sorry, you are not allowed to change your username", 400);
        }

        if('is_admin' in req.body) {
            throw new ExpressError("Sorry, you are not allowed to change your adminstrative privledges", 400);
        }

        const username = req.params.username;

        const check = await User.userCheck(username);

        if (!check) {
            throw new ExpressError(`It seems the username "${username}" does not exist`, 404);
        }

        const user = await User.updateUser(username, req.body);

        return res.json({ user })

    } catch (e) {
        return next(e);
    }
})

router.delete('/:username', checkCorrectUser, async function (req, res, next) {
    try {

        const username = req.params.username;

        const check = await User.userCheck(username);

        if (!check) {
            throw new ExpressError(`It seems the username "${username}" does not exist`, 404);
        }

        await User.delete(username);

        //need to delete diary here as well

        return res.json({ message: `You have successfully deleted your account for "${username}"` })
    } catch (e) {
        return next(e);
    }
})


module.exports = router;