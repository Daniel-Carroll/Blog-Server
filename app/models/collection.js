//collections.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CollectionSchema = new Schema({
    name: String,
    description: String,
    itemList: [{itemName: String, _itemId: Number}]
});

module.exports = mongoose.model('Collection', CollectionSchema);