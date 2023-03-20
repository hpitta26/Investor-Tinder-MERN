const mongoose = require('mongoose')

//id property is automatically generated

const startupSchema = new mongoose.Schema({
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
    bio: {
        type: String,
        required: true
    },
    analytics: {
        type: [String],
        required: true,
        validate: [arrayLimit4, '{PATH} must be of length 4']
    },
    achievements: {
        type: [String],
        required: true,
        validate: [arrayLimit4, '{PATH} must be of length 4']
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
    icons: {
        type: [String],
        required: true,
        validate: [arrayLimit3, '{PATH} must be of length 3']
    },
    businessModel: {
        type: String,
        required: true
    }
})

function arrayLimit3(val) {
    return val.length == 3;
}
function arrayLimit4(val) {
    return val.length == 4;
}

module.exports = mongoose.model('Startup', startupSchema, 'startups')