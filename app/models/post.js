//post.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    name: String,
    description: String,
    content: String,
    date: Date,
    category: String,
    user: String,
    comments: [{
       username: String,
       comment: String  
    }]
});

module.exports = mongoose.model('Post', PostSchema);