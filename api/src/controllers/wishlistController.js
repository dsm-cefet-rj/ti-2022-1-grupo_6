require('dotenv').config()
const { v4 } = require("uuid");
const Wishlist = require('../models/WishlistSchema');

module.exports = {

    async getWishlist(req, res){
        try {
            const wishlistData = await Wishlist.findById(req.params.wishlistId)

            if (!wishlistData) {
                throw new Error("Lista não Encontrada");
            }

            return res.json(wishlistData);
        }catch(error){
            return res.send(error.message)
        }
    },

    async getAllWishlists(req, res){
        try {
            const wishlistData = await Wishlist.find({user:req.user.profile})

            if (!wishlistData) {
                throw new Error("Não há favoritos");
            }

            return res.json(wishlistData);
        }catch(error){
            return res.send(error.message)
        }

    },
 
    async createWishlist(req, res){
        try {
            await Wishlist.create({
                ...req.body,
                user: req.user.profile 
            })
            return res.json({message: "Lista de desejos criada"});
        }catch(error){
            return res.send(error.message)
        }
    },

    async createFavorite(req, res){
        try {
            const wishlistData = await Wishlist.findByIdAndUpdate(req.params.wishlistId, {$push: {favorites:req.body}})
            
            if (!wishlistData) {
                throw new Error("A lista não existe");
            }
            
            return res.json({message: "Novo favorito adicionado"});
        }catch(error){
            return res.send(error.message)
        }
    },

    async removeFavorite(req, res){

        try {
            const wishlistData = await Wishlist.findByIdAndUpdate(req.params.wishlistId, {$pull: {favorites:req.body}})
            
            if (!wishlistData) {
                throw new Error("A lista não existe");
            }
            
            return res.json({message: "Favorito removido"});
        }catch(error){
            return res.send(error.message)
        }
    },

    async deleteWishlist(req, res){
        try {
            const wishlistData = await Wishlist.findByIdAndRemove(req.params.wishlistId)
            
            if (!wishlistData) {
                throw new Error("A lista não existe");
            }
            
            return res.json({message: "Lista de desejos excluída"});
        }catch(error){
            return res.send(error.message)
        }
    }

}