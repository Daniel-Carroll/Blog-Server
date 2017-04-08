//music-post.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewSchema = new Schema({
    name: String,
    rating: Number,
    content: String,
    date: Date,
    category: String,
    user: String,
    comments: [{
       username: String,
       comment: String  
    }]
});

module.exports = mongoose.model('Review', ReviewSchema);