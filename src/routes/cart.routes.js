const { Router } = require('express');
const passport = require('passport')

const cartRoutes = Router();

const cartController = require("../controllers/cartController");

cartRoutes.get('/', passport.authenticate("jwt", {session: false}), cartController.getCart);
cartRoutes.post('/', passport.authenticate("jwt", {session: false}), cartController.addProduct);
cartRoutes.put('/:productId', passport.authenticate("jwt", {session: false}), cartController.updateProduct);
cartRoutes.delete('/', passport.authenticate("jwt", {session: false}), cartController.deleteAll);
cartRoutes.delete('/:productId', passport.authenticate("jwt", {session: false}), cartController.deleteProduct);

exports.cartRoutes = cartRoutes;