const { Router } = require('express');
const passport = require('passport');

const orderRoutes = Router();

const ordersController = require("../controllers/ordersController");

orderRoutes.get(
    '/checkout', 
    passport.authenticate('jwt', { session: false }),
    ordersController.checkout
);

orderRoutes.post(
    '/', 
    passport.authenticate('jwt', { session: false }),
    ordersController.createOrder
);

exports.orderRoutes = orderRoutes;