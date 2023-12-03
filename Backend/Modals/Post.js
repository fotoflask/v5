const mongoose = require("mongoose");

const Postschema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    date:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    tag: [{
        type: String,

    }],
    image: {
        type: String,
    },
    video: {
        type: String,
    },
    likes: {
        type: Array,
        default:0
    },
    dislikes: {
        type: Array,
        default:0
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        comment: {
            type: String
        }
    }]



})

module.exports = mongoose.model('Post', Postschema);