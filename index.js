const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const Quiz = require('./mongo/models/Quiz');
const Flower = require('./mongo/models/Flower');
const favicon = require('express-favicon');
const Order = require('./mongo/models/Order');

const app = express();

app.set('view engine', 'ejs');
require('./mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(favicon(__dirname + '/public/favicon.png'));
app.use('/assets/', express.static(path.resolve(__dirname, 'public')));

let quized = false;
let orderCreated = false;

app.get('/', async (req, res) => {

    const content = await Flower.find({});

    const dataForSend = {
        content
    };

    if (quized) {
        dataForSend.message = true;
        quized = false
    } else {
        dataForSend.message = false;
    }

    if (orderCreated) {
        dataForSend.orderCreated = true;
        orderCreated = false;
    } else {
        dataForSend.orderCreated = false;
    }

    res.render('index', dataForSend);

});

app.post('/quiz', async (req, res) => {
    const {
        text,
        phone
    } = req.body;

    const newQuiz = await new Quiz({
        text,
        phone
    }).save();

    quized = true;
    res.json({
        quiz: 'success'
    });
});

app.post('/order', async (req, res) => {
    const {
        name,
        phone,
        location,
        amount,
        id
    } = req.body;

    const newOrder = await Order({
        productId: id,
        name,
        phone,
        location,
        amount
    }).save();

    orderCreated = true;

    res.redirect('/');
});

app.use('/admin', require('./admin'));

const listenHandler = (err) => {
    if (err) return console.log(err);
    console.log('__[ Server has started ]__');
}
app.listen(process.env.PORT || 5000, listenHandler);