const express = require('express')
const router = express.Router()
const Startup = require('../models/startupModel')

//GET -> All
router.get('/', async (req, res) => {
    try {
        const startups = await Startup.find()
        res.json(startups)
    } catch (err) {
        res.status(500).json({ message: err.message}) //500 -> there was an error in DB
    }
})

//GET -> One
router.get('/:id', async (req, res) => {
    try {
        const startup = await Startup.findById(req.params.id)
        if (startup == null) {
            return res.status(404).json({ message: 'Cannot find startup' }) //404 -> could not find something in the DB
        }
        res.json(startup)
    } catch (err) {
        res.status(500).json({ message: err.message}) //500 -> there was an error in DB
    }
})

//POST -> One
router.post('/', async (req, res) => {
    const startup = new Startup({ //req.body accesses the Json Object that the Client sent
        industries: req.body.industries,
        src: req.body.src,
        alt: req.body.alt,
        text: req.body.text,
        username: req.body.username,
        bio: req.body.bio,
        analytics: req.body.analytics,
        achievements: req.body.achievements,
        ocf: req.body.ocf,
        rgr: req.body.rgr,
        sales: req.body.sales,
        icons: req.body.icons,
        businessModel: req.body.businessModel
    })

    try {
        const savedStartup = await startup.save() //this will try to save the Startup to the DB
        res.status(201).json(savedStartup) // 201 -> successfully created an Object
    } catch (err) {
        res.status(400).json({ message: err.message}) // 400 -> something wrong with the user input (for example their Json String didn't have the correct structure)
    }
})


module.exports = router; //exports this module as a middleware to be used in rest of the project





//ERROR SUMMARY