//item.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ItemSchema = new Schema({
    name: String,
    description: String,
    worth: Number,
    qty: Number,
    category: String,
    location: String,
    origin: String,
    collectionName: {
        name: String,
        _collectionId: Number
    }
});

module.exports = mongoose.model('Item', ItemSchema);