const { Router } = require('express');

const cartRoutes = Router();

const cartController = require("../controllers/cartController");

cartRoutes.get('/', cartController.getAll);
cartRoutes.post('/', cartController.addProduct);
cartRoutes.put('/:id', cartController.updateProduct);
cartRoutes.delete('/', cartController.deleteAll);
cartRoutes.delete('/:id', cartController.deleteProduct);

exports.cartRoutes = cartRoutes;