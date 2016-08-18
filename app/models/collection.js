//collections.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String
});

module.exports = mongoose.model('Collection', CollectionSchema);