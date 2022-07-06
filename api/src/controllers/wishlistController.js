require('dotenv').config()
const { v4 } = require("uuid");
const Wishlist = require('../models/WishlistSchema');

/*const wishlist = [
    {
      id: 1,
      listName: 'Periféricos',
      favorites: [
        {
          slug:'gabriel-placa-de-video',
        },
        {
          slug:'thiago-mouse-gamer'
        }
      ]
    },
    {
      id: 2,
      listName: 'Componentes',
      favorites: [
        {
          slug:'felipe-ryzen-3-3200G'
        }
      ]
    }
  ];*/

module.exports = {

    async getWishlist(req, res){
        try {
            const wishlistData = await Wishlist.findById(req.params.wishlistId)
            return res.json(wishlistData);
        }catch(error){
            return res.send(error.message)
        }
    },

    async getAllWishlists(req, res){
        try {
            const wishlistData = await Wishlist.find({})
            return res.json(wishlistData);
        }catch(error){
            return res.send(error.message)
        }

    },
 
    async createWishlist(req, res){
        try {
            await Wishlist.create(req.body)
            return res.json({message: "Lista de desejos criada"});
        }catch(error){
            return res.send(error.message)
        }
    },

    async createFavorite(req, res){
        try {
            await Wishlist.findByIdAndUpdate(req.params.wishlistId, {$push: {favorites:req.body}})
            return res.json({message: "Novo favorito adicionado"});
        }catch(error){
            return res.send(error.message)
        }
    },

    /*async removeFavorite(req, res){

        try {
            const wishlistData = await Wishlist.findById(req.params.wishlistId);
            const favSlug = req.body;
            const favIndex = wishlistData.favorites.findIndex(item => item.slug == favSlug);
            wishlistData.favorites.splice(favIndex,1);
            await Wishlist.findByIdAndUpdate(req.params.wishlistId, {$set: wishlistData})

            return res.json({message: "Favorito removido"});
        }catch(error){
            return res.send(error.message)
        }
    },*/

    async deleteWishlist(req, res){
        try {
            await Wishlist.findByIdAndRemove(req.params.wishlistId)
            return res.json({message: "Lista de desejos excluída"});
        }catch(error){
            return res.send(error.message)
        }
    }

}