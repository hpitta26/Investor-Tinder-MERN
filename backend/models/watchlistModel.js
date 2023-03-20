const mongoose = require('mongoose')

//id property is automatically generated

const watchlistSchema = new mongoose.Schema({
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
    ocf: {
        type: [Number],
        required: true,
        validate: [arrayLimit3, '{PATH} must be of length 3']
    },
    rgr: {
        type: [Number],
        required: true,
        validate: [arrayLimit3, '{PATH} must be of length 3']
    },
    sales: {
        type: [Number],
        required: true,
        validate: [arrayLimit3, '{PATH} must be of length 3']
    },
    star: {
        type: Boolean,
        required: false,
        default: false
    }
})

function arrayLimit3(val) {
    return val.length == 3;
}

module.exports = mongoose.model('Watchlist', watchlistSchema, 'watchlist') //3rd arguement is the collection name where you want to store this Schema