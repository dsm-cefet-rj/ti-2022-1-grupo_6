const { Router } = require('express');
const passport = require('passport');

const orderRoutes = Router();

const ordersController = require("../controllers/ordersController");

orderRoutes.get(
    '/client-orders/:clientId',
    passport.authenticate('jwt', { session: false }),
    ordersController.getOrdersItems
);

orderRoutes.post(
    '/', 
    passport.authenticate('jwt', { session: false }),
    ordersController.createOrder
);

orderRoutes.get(
    '/redirect',
    ordersController.redirect
)

exports.orderRoutes = orderRoutes;