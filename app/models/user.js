//user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: String,
    password: String,
    admin: boolean
});

module.exports = mongoose.model('User', UserSchema);