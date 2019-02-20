const express = require('express');
const Quiz = require('../mongo/models/Quiz');
const Flower = require('../mongo/models/Flower');
const cloudinary = require('cloudinary');
const multer = require('multer');
const fs = require('fs');

const router = express.Router();

// setup starts

cloudinary.config({ 
    cloud_name: 'grami', 
    api_key: '966272348285316', 
    api_secret: 'gqvP_uCAQXVYf79PwcwXGrdr5yk' 
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname);
    }
});

const upload = multer({storage});

// setup ends

router.get('/', async(req, res) => {
    const password = req.query.password
    
    if(password === 'void') {
        const quizzes = await Quiz.find();
        const flowers = await Flower.find();
        res.render('admin', {quizzes, flowers});
    } else {
        res.redirect('/');
    }
});

router.post('/add', upload.single('image'), async(req, res) => {
    const {title, cost, description} = req.body;

    cloudinary.v2.uploader.upload(req.file.path, async(error, result) => {
        fs.unlinkSync(req.file.path, (err) => {
            if(err) return console.log(err);
        });

        if(error) return console.log(error);

        const newFlower = await new Flower({
            title, cost, description,
            imgId: result.public_id,
            img: result.url
        }).save();

        res.redirect('/admin?password=void');
    });
});

router.post('/remove', async(req, res) => {

    const {id, type} = req.body;

    if(type == 'flower') {
        try {
            const removedItem = await Flower.findOneAndDelete({_id: id});
        
            cloudinary.api.delete_resources(removedItem.imgId, (err, result) => {
                if(err) {
                    console.log(err);
                    res.json({removed: false});
                } else {
                    res.json({removed: true});
                }
            });
        } catch (error) {
            console.log(error);
            res.json({removed: false});
        }
    } else if(type == 'quiz') {
        try {
            const removedItem = await Quiz.findByIdAndRemove(id);
            res.json({removed: true})
        } catch (error) {
            console.log(error);
            res.json({removed: false});
        }
    }
});

module.exports = router;