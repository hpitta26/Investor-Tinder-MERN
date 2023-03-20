const mongoose = require('mongoose')

//id property is automatically generated

const portfolioSchema = new mongoose.Schema({
    industries: {
        type: String,
        required: true
    },
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true,
    },
    text: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model('Portfolio', portfolioSchema, 'portfolio')