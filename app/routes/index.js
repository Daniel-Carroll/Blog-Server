var express = require('express')
var routeManager = express.Router();

    routeManager.use('/posts', require('./postRoutes'))
    routeManager.use('/items', require('./itemRoutes'))
    routeManager.use('/users', require('./userRoutes'))
    
    module.exports = routeManager;