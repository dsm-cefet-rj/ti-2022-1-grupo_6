const { Router } = require('express');

const orderRoutes = Router();

const ordersController = require("../controllers/ordersController");

orderRoutes.get('/checkout', ordersController.checkout);
orderRoutes.post('/', ordersController.createOrder);

exports.orderRoutes = orderRoutes;