const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Quiz = require('./mongo/models/Quiz');

const app = express();

app.set('view engine', 'ejs');
require('./mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/assets/', express.static(path.resolve(__dirname, 'public')));

let quized = false;

app.get('/', (req, res) => {
    if(quized) {
        res.render('index', {
            massage: 'Вы участвуете в конкурсе'
        });

        quized = false;
    } else {
        res.render('index');
    }
});

app.post('/quiz', async(req, res) => {
    const {text, phone} = req.body;

    const newQuiz = await new Quiz({text, phone}).save();
    
    quized = true;
    res.redirect('/');
});

const listenHandler = (err) => {
    if(err) return console.log(err);
    console.log('__[ Server has started ]__');
}
app.listen(process.env.PORT || 5000, listenHandler);
