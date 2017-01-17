//server.js

//BASE SETUP
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./app/routes/index');



//configure app to use body-parser
//Will allow to get data from post
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5000;        // set our port

//start server
app.listen(port);
console.log('Buffet City is evil: ' + port);

app.use(function(req,res,next){
   res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,Content-Type,Cache-Control"); 
});

//ROUTES FOR OUR API
app.use('/blog_api/api', router);

// Error Handling
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
});

module.exports = app;