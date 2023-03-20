const express = require('express')
const router = express.Router()
const Watchlist = require('../models/watchlistModel')

//GET -> All
router.get('/', async (req, res) => {
    try {
        const watchlist = await Watchlist.find()
        res.json(watchlist)
    } catch (err) {
        res.status(500).json({ message: err.message}) //500 -> there was an error in DB
    }
})


//GET -> One
router.get('/:id', getWatchlistUser, async (req, res) => {
    res.json(res.watchlistUser)
})


//POST -> One
router.post('/', async (req, res) => { 
    // must have a check to see if that username has already been added to the watchlist
    var isUserInWatchlist = false;
    try {
        const checkUser = await Watchlist.findOne( {username: req.body.username} )
        if (checkUser != null) {
            isUserInWatchlist = true;
        }
    } catch (err) {
        res.status(500).json({ message: err.message}) // 500 -> there was an error in DB
    }

    if (!isUserInWatchlist) {
        const watchlistUser = new Watchlist({ // req.body accesses the Json Object that the Client sent
            industries: req.body.industries,
            src: req.body.src,
            alt: req.body.alt,
            text: req.body.text,
            username: req.body.username,
            ocf: req.body.ocf,
            rgr: req.body.rgr,
            sales: req.body.sales,
            star: false
        })
        try {
            const savedWatchlistUser = await watchlistUser.save() 
            res.status(201).json(savedWatchlistUser) // 201 -> successfully created an Object
        } catch (err) {
            res.status(400).json({ message: err.message}) // 400 -> something wrong with the user input (for example their Json String didn't have the correct structure)
        }
    } else {
        res.status(400).json({ message: 'User is already in the Watchlist' }) // 400 -> something wrong with the user input (for example their Json String didn't have the correct structure)
    }

    
})


//PATCH -> One
router.patch('/:id', getWatchlistUser, async (req, res) => { // currently only updates the "star" property
    console.log('Patch Reached')
    if (req.body.star != null) {
        res.watchlistUser.star = req.body.star
    }
    try {
        const updatedWatchlistUser = await res.watchlistUser.save()
        res.json(updatedWatchlistUser)
    } catch (err) {
        res.status(400).json({ message: err.message}) // 400 -> something wrong with the user input (for example their Json String didn't have the correct structure)
    }
})


//DELETE -> One
router.delete('/:id', getWatchlistUser, async (req, res) => {
    try {
        await Watchlist.deleteOne(res.watchlistUser)
        res.json({ message: 'Deleted user from Watchlist' })
    } catch (err) {
        res.status(500).json({ message: err.message }) // 500 -> there was an error in DB
    }
})


async function getWatchlistUser(req, res, next) { //This is a middleware function -> used to get a single watchlistUser fom the database
    var watchlistUser
    try {
        watchlistUser = await Watchlist.findById(req.params.id)
        if (watchlistUser == null) {
            return res.status(404).json({ message: 'Cannot find Watchlist User' }) //404 -> could not find something in the DB
        }
    } catch (err) {
        res.status(500).json({ message: err.message}) //500 -> there was an error in DB
    }

    res.watchlistUser = watchlistUser
    next() //passes to the next piece of middleware
}


module.exports = router;