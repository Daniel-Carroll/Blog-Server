/**
 * Created by Compt on 9/2/2016.
 */
var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



var User = require('./../models/user');

//Middleware to use for all requests
router.use(function(req, res, next){
    console.log('opening connection to /stuff/collections/Users...')
    mongoose.connect('mongodb://cornbread:swagswag@ds147965.mlab.com:47965/stuff/collections/Users');
    next(); //make sure next routes are ran
})

router.route('/')
    .post(function(req, res){
        console.log("posting user...")
        var user = new User();
        user.email = req.body.email;
        user.username = req.body.username;
        user.password = req.body.password;
        user.collectionList = req.body.collectionList;
        user.itemList = req.body.itemList;

        user.save(function(err){
            if(err)
                res.send(err);

            res.json({message: 'User created!'})
            mongoose.disconnect()
        });

    });

router.route('/')
    .get(function(req, res){
        console.log('getting users')
        User.find(function(err, user){
            if(err)
                res.send(err);

            res.json(user)
            mongoose.disconnect()
        });
    });

module.exports = router;