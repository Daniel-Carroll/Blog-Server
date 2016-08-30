var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



var Item = require('./../models/item');

//Middleware to use for all requests
router.use(function(req, res, next){
    console.log('opening connection to /stuff/collections/Items...')
    mongoose.connect('mongodb://cornbread:swagswag@ds147965.mlab.com:47965/stuff/collections/Items');
    next(); //make sure next routes are ran
})

router.route('/')
    .post(function(req, res){
       console.log("posting item...")
       var item = new Item();
       item.name = req.body.name;
       item.description = req.body.description;
       item.worth = req.body.worth;
       item.qty = req.body.qty;
       item.category = req.body.category;
       item.location = req.body.location;
       item.origin = req.body.origin;
       item.collectionName = req.body.collectionName;
       
       item.save(function(err){
           if(err)
                res.send(err);                
                
           res.json({message: 'Item created!'})
           mongoose.disconnect()
       });
    });
    
router.route('/')
    .get(function(req, res){
        console.log('getting items')
        Item.find(function(err, items){
            if(err)
                res.send(err);
                
            res.json(items)
            mongoose.disconnect()
        });
    });
    
module.exports = router;