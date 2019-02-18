const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('quiz', quizSchema);