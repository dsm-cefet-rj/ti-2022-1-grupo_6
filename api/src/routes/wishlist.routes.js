const { Router } = require('express');

const wishlistController = require("../controllers/wishlistController");

const wishlistRoutes = Router();

wishlistRoutes.get("/:wishlistId", wishlistController.getWishlist);
wishlistRoutes.get("/", wishlistController.getAllWishlists);
wishlistRoutes.post("/", wishlistController.createWishlist);
wishlistRoutes.put("/:wishlistId", wishlistController.createFavorite);
//wishlistRoutes.put("/:wishlistId", wishlistController.removeFavorite);
wishlistRoutes.delete("/:wishlistId", wishlistController.deleteWishlist);


exports.wishlistRoutes = wishlistRoutes;