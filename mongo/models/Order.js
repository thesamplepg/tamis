const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        require: true
    }
});

module.exports = mongoose.model('order', orderSchema);