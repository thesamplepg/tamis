const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
// require('./mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/assets/', express.static(path.resolve(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
});

const listenHandler = (err) => {
    if(err) return console.log(err);
    console.log('__[ Server has started ]__');
}
app.listen(process.env.NODE_ENV || 5000, listenHandler);
