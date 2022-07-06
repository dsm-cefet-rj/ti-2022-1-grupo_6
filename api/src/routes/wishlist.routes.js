const { Router } = require('express');

const wishlistController = require("../controllers/wishlistController");

const wishlistRoutes = Router();

wishlistRoutes.get(
    "/:wishlistId",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
    return wishlistController.getWishlist(req,res);
    }
)

wishlistRoutes.get(
    "/",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
    return wishlistController.getAllWishlists(req,res);
    }
)

wishlistRoutes.post(
    "/",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
    return wishlistController.createWishlist(req, res);
    }
)

wishlistRoutes.put(
    "/:wishlistId",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
    return wishlistController.createFavorite(req, res);
    }
)

//wishlistRoutes.put("/d/:wishlistId", wishlistController.removeFavorite);

wishlistRoutes.delete(
    "/:wishlistId",
    passport.authenticate("jwt", {session: false}),
    (req, res) => {
    return wishlistController.deleteWishlist(req, res);
    }
)


exports.wishlistRoutes = wishlistRoutes;