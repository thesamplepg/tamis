const mongoose = require('mongoose');

const flowerSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    cost: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgId: {
        type: String,
        required: true
    },
    img: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('flower', flowerSchema);