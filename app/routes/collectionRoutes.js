var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Collection = require('./app/models/collection');

router.route('/collections')
    .post(function(req, res){
       console.log("posting...")
       var collection = new Collection();
       collection.name = req.body.name;
       collection.description = req.body.description;
       collection.itemList = req.body.itemList;
       
       collection.save(function(err){
           if(err)
                res.send(err);                
                
           res.json({message: 'Collection created!'})
       });
    });
    
router.route('/collections')
     .get(function(req, res){
        console.log("getting...")
        Collection.find(function(err, collections){
           if(err)
                res.send(err);
                
            res.json(collections)
        });
    });

router.route('/collections/:collection_id')
    .get(function(req,res){
        Collection.findById(req.params.collection_id, function(err, collection){
            if(err)
                res.send(err);
            res.json(collection);
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
         })
     })
     
module.exports = router;