//add express custom errors

const express = require('express');
const ExpressError = require('../helpers/ExpressError');
const Prompts = require('../models/prompts');
const { authUser, authAdmin } = require('../middleware/auth');

const router = express.Router();


//prompts routes
router.get('/flagged', authAdmin, async function (req, res, next) {
    try {

        const prompts = await Resources.getFlaggedPrompts();

        return res.json({prompts})

    } catch (e) {
        return next(e);
    }
})

router.get('/:num?', async function (req, res, next) {
    try {
        
        const num = req.params.num || 1;

        const prompts = await Prompts.getPrompts(num);

        return res.json({prompts})

    } catch (e) {
        return next(e);
    }
})




router.post('/', authUser, async function (req, res, next) {
    try {
        const prompt = req.body.prompt;

        const flagged = req.body.is_admin ? false : true;

        const addedPrompt = await Prompts.addPrompt(prompt, flagged);
        
        return res.json({addedPrompt})

    } catch (e) {
        return next(e);
    }
})

router.patch('/:id', authUser, async function (req, res, next) {
    try {

        const id = req.params.id;

        const changeFlagTo = req.body.is_admin ? true : false;

        const prompt = await Prompts.changePromptFlag(id, changeFlagTo);

        return res.json({prompt})
        
    } catch (e) {
        return next(e);
    }
})

router.delete('/:id', authAdmin, async function (req, res, next) {
    try {

        const id = req.params.id;
        console.log(id);

        await Prompts.deletePrompt(id)
        
        return res.json({ message: 'The prompt has been deleted' })
    } catch (e) {
        return next(e);
    }
})


module.exports = router;




