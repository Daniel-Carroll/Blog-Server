var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();



var Post = require('./../models/post');

//Middleware to use for all requests
router.use(function(req, res, next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control");
    console.log('opening connection to /stuff/collections/Collection...')
    mongoose.connect('mongodb://cornbread:poop@ds139198.mlab.com:39198/blog')
    next(); //make sure next routes are ran
})

router.route('/')
    .options(function(req, res){
        next();
    })

router.route('/')
    .post(function(req, res){
       console.log("posting blog post...")
       var post = new Post();
       //save request body 
       post.name = req.body.name;
       post.description = req.body.description;
       post.content = req.body.content;
       post.date = req.body.date;
       post.category = req.body.category;
       post.user = req.body.user;
       
       post.save(function(err){
           if(err)
                res.send(err);                
                
           res.json({message: 'Blog Post created!'})
           mongoose.disconnect()
       });

    });
    
router.route('/')
     .get(function(req, res){
        console.log("getting...")
        Post.find(function(err, posts){
           if(err)
                res.send(err);
                
            res.json(posts)
            mongoose.disconnect()
        });
      
    });

router.route('/:post_id')
    .get(function(req,res){
        Post.findById(req.params.post_id, function(err, post){
            if(err)
                res.send(err);
            res.json(post)
            mongoose.disconnect()
        });
    })
    
    .put(function(req,res){
        Post.findById(req.params.post_id, function(err, post){
            if(err)
                res.send(err);
            post.name = req.body.name;
            post.description = req.body.description;
            post.content = req.body.content;
            post.date = req.body.date;
            post.category = req.body.category;
            post.user = req.body.user;           
            
            post.save(function(err){
                if(err)
                    res.send(err);
                res.json({message: 'Blog Post updated!'})
                mongoose.disconnect()
            })
        })
     })
     
     .delete(function(req,res){
         Post.remove({
             _id: req.params.post_id
         }, function(err, post){
             if(err)
                res.send(err);
             res.json({message:'Blog Post deleted!'})
             mongoose.disconnect()
         })
     })
     
module.exports = router;