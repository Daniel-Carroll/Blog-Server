var express = require('express')
var routeManager = express.Router();

    routeManager.use('/posts', require('./postRoutes'))
    routeManager.use('/items', require('./itemRoutes'))
    routeManager.use('/users', require('./userRoutes'))
    routeManager.use('/music', require('./musicRoutes'))
    
    module.exports = routeManager;