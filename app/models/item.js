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
    dateObtained: { type: Date, default: Date.now },
    origin: String,
    collection: {
        name: String,
        _collectionId: Schema.Type.ObjectId
    }
});

module.exports = mongoose.model('Item', ItemSchema);