const { Router } = require('express');
const routes = Router();

const { orderRoutes } = require('./orders.route');
const { productsRoutes } = require('./products.routes');
const { cartRoutes } = require('./cart.routes');
const { wishlistRoutes } = require('./wishlist.routes');
const { usersRoutes } = require('./users.routes');

routes.use('/order', orderRoutes);
routes.use('/products', productsRoutes);
routes.use('/users', usersRoutes);
routes.use('/cart', cartRoutes);
routes.use('/wishlist', wishlistRoutes);

module.exports = routes;
