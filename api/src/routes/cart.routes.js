const { Router } = require('express');

const cartRoutes = Router();

const cartController = require("../controllers/cartController");

cartRoutes.get('/', cartController.getCart);
cartRoutes.post('/', cartController.addProduct);
cartRoutes.put('/:productId', cartController.updateProduct);
cartRoutes.delete('/', cartController.deleteAll);
cartRoutes.delete('/:productId', cartController.deleteProduct);

exports.cartRoutes = cartRoutes;