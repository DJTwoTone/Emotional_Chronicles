const express = require('express');
const ExpressError = require('../helpers/expressError');
const Admin = require('../models/admin');
const { authAdmin } = require('../middleware/auth');
const { json } = require('express');

const router = express.Router();

router.get('/inspirations', authAdmin, async function(req, res, next) {
    try {

        const flagged = await Admin.getFlaggedInspiration();
        router.post('/prompt', authAdmin, async function(req, res, next) {
        
            try {
                const prompt = req.body.prompt;
        
                await Admin.addPrompt(prompt);
        
                return res.status(201).json({ message: "Prompt added"})
            } catch (e) {
                return next(e)
            }
        
        })

        if(flagged.length = 0) {
            return res.json({ message: "No inspirations need approval" })
        }

        return res.json({ message: "Please look at these submitted inspirations", flagged})


    } catch (e) {
        return next(e);
    }
})


router.post('/inspiration', authAdmin, async function(req, res, next) {

    try {
        const inspiration = req.body.inspiration;

        await Admin.addInspiration(inspiration);

        return res.status(201).json({ message: "Inspiration added"})
    } catch (e) {
        return next(e)
    }

})

router.patch('/inspiration/:id', authAdmin, async function(req, res, next) {

    try {
        const id = req.params.id;

        await Admin.approveInspiration(id);

        return res.json({ message: "Inspiration approved."})
    } catch (e) {
        return next(e);
    }
})

router.delete('/inspiration/:id', authAdmin, async function(req, res, next) {

    try {

        const id = req.params.id;

        await Admin.delInspiration(id);

        return res.json({ message: "Inspiration rejected and deleted." })

    } catch (e) {

        return next(e);
    }
})