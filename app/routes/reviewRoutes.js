var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



var Review = require('./../models/review');

//Middleware to use for all requests
router.use(function(req, res, next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    console.log('opening connection to /blog/collections/posts...')
    mongoose.connect('mongodb://cornbread:poop@ds139198.mlab.com:39198/blog/collections/reviews')
    next(); //make sure next routes are ran
})

router.route('/')
    .post(function(req, res){
      
       console.log("posting Review...")
       var post = new Review();
       //save request body 
       post.name = req.body.name;
       post.rating = req.body.rating;
       post.content = req.body.content;
       post.date = req.body.date;
       post.category = req.body.category;
       post.user = req.body.user;
       post.comments = req.body.comments;
       
       post.save(function(err){
           if(err)
                res.send(err);                
                
           res.json({message: 'Review created!'})
           mongoose.disconnect()
       });
    });
    
router.route('/')
     .get(function(req, res){
        console.log("getting...")
        Review.find(function(err, posts){
           if(err)
                res.send(err);
                
            res.json(posts)
            mongoose.disconnect()
        });
      
    });

router.route('/:post_id')
    .get(function(req,res){
        Review.findById(req.params.post_id, function(err, post){
            if(err)
                res.send(err);
            res.json(post)
            mongoose.disconnect()
        });
    })
    
    .put(function(req,res){
        Review.findById(req.params.post_id, function(err, post){
            if(err)
                res.send(err);
            post.name = req.body.name;
            post.rating = req.body.rating;
            post.content = req.body.content;
            post.date = req.body.date;
            post.category = req.body.category;
            post.user = req.body.user;    
            post.comments = req.body.comments;       
            
            post.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Review updated!'})
                mongoose.disconnect()
            })
        })
     })
     
     .delete(function(req,res){
         Review.remove({
             _id: req.params.post_id
         }, function(err, post){
             if(err)
                res.send(err);
             res.json({message:'Review deleted!'})
             mongoose.disconnect()
         })
     })
     
module.exports = router;
