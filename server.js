//server.js

//BASE SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://cornbread:swagswag@ds147965.mlab.com:47965/stuff/collections/Collection');

var Collection = require('./app/models/collection');

//ROUTES FOR OUR API
var router = express.Router();

//Middleware to use for all requests
router.use(function(req, res, next){
    console.log('middleware...')
    next(); //make sure next routes are ran
})

router.route('/')
    .get( function(req, res){
    res.json({message: 'Yeah nigga we made it!'});
    });

router.route('/collections')
    .post(function(req, res){
       console.log("posting...")
       var collection = new Collection();
       collection.name = req.body.name;
       
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
            
            
            collection.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Collection updated!'})
            })
        })
     })
     
     .delete(function(req,res){
         Collection.remove({
             _id: req.params._id
         }, function(err, collection){
             if(err)
                res.send(err);
             res.json({message:'Collection deleted!'})
         })
     })
   
    


//configure app to use body-parser
//Will allow to get data from post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

app.use('/api', router);

//start server
app.listen(port);
console.log('Buffet City is evil: ' + port);

