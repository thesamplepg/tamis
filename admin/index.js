const express = require('express');
const Quiz = require('../mongo/models/Quiz');

const router = express.Router();

router.get('/:password' , async(req, res) => {
    const password = req.params.password;
    
    if(password === 'void') {
        const quizzes = await Quiz.find();
        res.render('admin', {quizzes});
    } else {
        res.redirect('/');
    }
});

module.exports = router;