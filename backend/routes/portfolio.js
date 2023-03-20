const express = require('express')
const router = express.Router()
const Portfolio = require('../models/portfolioModel')


//GET -> All && GET -> One (username specified)
router.get('/', async (req, res) => {
    if (req.query.username === undefined) {
        try {
            const portfolio = await Portfolio.find()
            res.json(portfolio)
        } catch (err) {
            res.status(500).json({ message: err.message}) //500 -> there was an error in DB
        }
    } else { 
        try {
            const portfolioUser = await Portfolio.findOne({ username: req.query.username })
            if (portfolioUser == null) {
                return res.status(404).json({ message: 'Cannot find Portfolio User' }) //404 -> could not find something in the DB
            }
            res.json(portfolioUser)
        } catch (err) {
            res.status(500).json({ message: err.message}) //500 -> there was an error in DB
        }
    }
    
})

//POST -> One
router.post('/', async (req, res) => {
    const portfolio = new Portfolio({ //req.body accesses the Json Object that the Client sent
        industries: req.body.industries,
        src: req.body.src,
        alt: req.body.alt,
        text: req.body.text,
        username: req.body.username,
        amount: req.body.amount
    })

    try {
        const savedPortfolioUser = await portfolio.save() //this will try to save the portfolioUser to the DB
        res.status(201).json(savedPortfolioUser) // 201 -> successfully created an Object
    } catch (err) {
        res.status(400).json({ message: err.message}) // 400 -> something wrong with the user input (for example their Json String didn't have the correct structure)
    }
})

//PATCH -> One
router.patch('/', async (req, res) => {
    if (req.body.amount === undefined) { //returns if the amount property is undefined
        return res.status(400).json({ message: 'must specify amount property'}) // 400 -> something wrong with the user input
    } else if (req.query.username === undefined) {
        return res.status(400).json({ message: 'must pass username as query parameter'}) // 400 -> something wrong with the user input
    }

    try {
        const filter = { username: req.query.username };
        const update = { amount: req.body.amount };
        const updatedPortfolioUser = await Portfolio.findOneAndUpdate(filter, update, {
            new: true
        });
        if (updatedPortfolioUser == null) {
            return res.status(400).json({ message: 'User with specified username does not exist'}) // 400 -> something wrong with the user input
        }
        res.json(updatedPortfolioUser)
    } catch (err) {
        res.status(400).json({ message: err.message}) // 400 -> something wrong with the user input (for example their Json String didn't have the correct structure)
    }
})

//DELETE -> One (future implementation)
router.delete('/:id', async (req, res) => {
    try {
        const response = await Portfolio.findByIdAndDelete(req.params.id)
        if (response == null) {
            return res.status(404).json({ message: 'Cannot find Portfolio User' }) //404 -> could not find something in the DB
        }
        console.log(response)
        res.json({ message: 'Deleted User from Portfolio' })
    } catch (err) {
        res.status(500).json({ message: err.message }) // 500 -> there was an error in DB
    }
})


module.exports = router; //exports this module as a middleware to be used in rest of the project