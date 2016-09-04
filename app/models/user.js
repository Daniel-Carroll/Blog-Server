//user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    email: String,
    username: String,
    password: String,
    collectionList: [{collectionName: String, _collectionId: String}],
    itemList: [{itemName: String, _itemId: Number}]
});

module.exports = mongoose.model('User', UserSchema);