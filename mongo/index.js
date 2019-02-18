const mongoose = require('mongoose');

const url = 'mongodb://admin:asdf123@ds111895.mlab.com:11895/cosmetic-place';

mongoose.connect(url, {useNewUrlParser: true}, (err) => {
    if(err) return console.log(err);
    console.log('__[ Connected to DB ]__');
});
