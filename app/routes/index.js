var express = require('express')
var routeManager = express.Router();

    routeManager.use('/collections', require('./collectionRoutes'))
    routeManager.use('/items', require('./itemRoutes'))
    
    module.exports = routeManager;