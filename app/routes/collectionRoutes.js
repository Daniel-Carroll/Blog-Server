var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



var Collection = require('./../models/collection');

//Middleware to use for all requests
router.use(function(req, res, next){
    console.log('opening connection to /stuff/collections/Collection...')
    mongoose.connect('mongodb://cornbread:swagswag@ds147965.mlab.com:47965/stuff/collections/Collection');
    next(); //make sure next routes are ran
})

router.route('/')
    .post(function(req, res){
       console.log("posting collection...")
       var collection = new Collection();
       //save request body 
       collection.name = req.body.name;
       collection.description = req.body.description;
       collection.itemList = req.body.itemList;
       
       collection.save(function(err){
           if(err)
                res.send(err);                
                
           res.json({message: 'Collection created!'})
           mongoose.disconnect()
       });
    });
    
router.route('/')
     .get(function(req, res){
        console.log("getting...")
        Collection.find(function(err, collections){
           if(err)
                res.send(err);
                
            res.json(collections)
            mongoose.disconnect()
        });
    });

router.route('/:collection_id')
    .get(function(req,res){
        Collection.findById(req.params.collection_id, function(err, collection){
            if(err)
                res.send(err);
            res.json(collection)
            mongoose.disconnect()
        });
    })
    
    .put(function(req,res){
        Collection.findById(req.params.collection_id, function(err, collection){
            if(err)
                res.send(err);
            collection.name = req.body.name;
            collection.description = req.body.description;
            collection.itemList = req.body.itemList;
            
            
            collection.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Collection updated!'})
                mongoose.disconnect()
            })
        })
     })
     
     .delete(function(req,res){
         Collection.remove({
             _id: req.params.collection_id
         }, function(err, collection){
             if(err)
                res.send(err);
             res.json({message:'Collection deleted!'})
             mongoose.disconnect()
         })
     })
     
module.exports = router;