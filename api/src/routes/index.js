const { Router } = require('express');
const routes = Router();

const paymentsController = require('../controllers/paymentsController');
const { productsRoutes } = require('./products.routes');

routes.post('/checkout', paymentsController.checkout);
routes.use('/products', productsRoutes);

module.exports = routes;
