var express = require('express')
var routeManager = express.Router();

    routeManager.use('/collections', require('./collectionRoutes'))
    routeManager.use('/items', require('./itemRoutes'))
    routeManager.use('/users', require('./userRoutes'))
    
    module.exports = routeManager;