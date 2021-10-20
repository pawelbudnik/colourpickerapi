// Since one of your main Tasks at Frontify will be consuming and building APIs, we want to see how you would build and consume your API. 
// The Task for you is to build a simple API that manages color definitions. Each color has a name and a hex value. 
// Your API should be responsible for the following things: list, create, and also delete colors. 
// Part of your task is also to build a Frontend that interacts with this API.

const express = require('express');
const monk = require('monk');
const Joi = require('@hapi/joi');

const db = monk(process.env.MONGO_URI);
const colourpicker = db.get('colourpicker');

db.on('error', (error) => console.error(error));
db.once('open', () => console.error('Connected to DB'));

const schema = Joi.object({
    colour: Joi.string().trim().required(),
    hex: Joi.string().trim().required().max(9),
    rgb: Joi.string().trim().required(),
});

const router = express.Router();

// READ All
router.get('/', async (req, res, next) => {
    try {
        const items = await colourpicker.find({});
        res.json(items);
    } catch (error) {
        next(error);
    }
});

// READ One
router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await colourpicker.findOne({
            _id: id,
        });
        if(!item) return next();
        return res.json(item);
    } catch (error) {
        next(error);
    }
});

// CREATE resource
router.post('/', async (req, res, next) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await colourpicker.insert(value);
        res.json(inserted);
    } catch (error) {
        next(error);
    }
});

// UPDATE resource
router.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const value = await schema.validateAsync(req.body);
        const item = await colourpicker.findOne({
            _id: id,
        });
        if(!item) return next();
        await colourpicker.update({
            _id: id,
        }, {
            $set: value,
        });
        return res.json(value);
    } catch (error) {
        next(error);
    }
});

// DELETE resource
router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await colourpicker.remove({ _id: id});
        res.json({
            message: 'Successfuly deleted colour',
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;