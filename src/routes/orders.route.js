const { Router } = require('express');
const passport = require('passport');

const orderRoutes = Router();

const ordersController = require("../controllers/ordersController");

orderRoutes.get(
    '/checkout', 
    ordersController.checkout
);

orderRoutes.post(
    '/', 
    passport.authenticate('jwt', { session: false }),
    ordersController.createOrder
);

exports.orderRoutes = orderRoutes;