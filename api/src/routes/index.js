const { Router } = require('express');
const routes = Router();

const paymentsController = require('../controllers/paymentsController');
const { productsRoutes } = require('./products.routes');
const { cartRoutes } = require('./cart.routes');
const { wishlistRoutes } = require("./wishlist.routes");

routes.post('/checkout', paymentsController.checkout);
routes.use('/products', productsRoutes);
routes.use('/cart', cartRoutes);
routes.use("/wishlist", wishlistRoutes);

module.exports = routes;
