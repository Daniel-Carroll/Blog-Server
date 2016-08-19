module.exports = function (app) {
    app.use('/collections', require('./collectionRoutes'));
};