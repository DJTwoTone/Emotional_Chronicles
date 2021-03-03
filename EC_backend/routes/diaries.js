const express = require('express');
const ExpressError = require('../helpers/expressError');
const symantoCall = require('../helpers/symantoCall');
const Diaries = require('../models/diaries');
const { authUser, checkCorrectUser } = require('../middleware/auth');

const router = express.Router();

//get single entry by id
router.get('/:date', checkCorrectUser, async function(req, res, next) {
    try {
        const entryDate = req.params.date;
        const username = req.body.username;
        const entry = await Diaries.getEntry(username, entryDate);

        // if (entry.username !== username) {
        //     throw new ExpressError("Access to diary entry denied", 401);
        // }

        return  res.json({ entry })
        
    } catch (e) {
        return next(e)
    }
})

//need to get a month of entries

router.get('/month/:date', checkCorrectUser, async function(req, res, next) {
    try {

        const dateInMonth = req.params.date;
        const username = req.body.username;
        const month = await Diaries.getMonth(username, dateInMonth)

        return res.json({ month })
        
    } catch (e) {
        return next(e);
    }
})

//get all entries by user

router.get('/', checkCorrectUser, async function (req, res, next) {
    try {
        const username = req.body.username;

        const entries = await Diaries.getEntries(username);

        // if (entries[0].username !== username) {
        //     throw new ExpressError("Access to diary denied", 401);
        // }
        
        return res.json({ ...entries });

    } catch (e) {
        return next(e);
    }
})

//post entry 

router.post('/', authUser, async function (req, res, next) {
    try {
        const { diaryentry, emotions } = req.body;
        const username = req.body.username;

     
        const today = new Date().toISOString().split('T')[0];

        const check = await Diaries.checkToday(username, today);

        if (!check) {
            throw new ExpressError("You've already made an entry for today.")
        }


        const calldata = await symantoCall(diaryentry);

        
        const emopredictions = calldata[0].predictions.reduce((acc, emo) => {
            let { prediction, probability } = emo;
            return {...acc, [prediction]: probability}
        }, {});
        
        const data = {username, diaryentry, ...emopredictions, emotions}
        // console.log(data)

        const entry = await Diaries.addEntry(data)

        return res.json({ entry })

        
    } catch (e) {
        return next(e)
    }
})

//edit entry - I don't want this

//delete entry - need to delete all for a user including the link table


module.exports = router;