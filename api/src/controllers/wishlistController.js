require('dotenv').config()
const { v4 } = require("uuid");

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

const Wishlist = require('../modules/wishlist/models/WishlistSchema');

module.exports = {

    async getWishlist(req, res){

        try {
            const wishlistData = await Wishlist.findById(req.params.id)
            return res.json(wishlistData);
        }catch(error){
            return res.send(error.message)
        }
    },

    /*async getAllWishlists(req, res){
        try {
            return res.json({wishlist});
        }catch(error){
            return res.send(error.message)
        }
    },*/

    //
    async getAllWishlists(req, res){

        try {
            const wishlistData = await Wishlist.find({}).maxTime(3000)
            return res.json(wishlistData);
        }catch(error){
            return res.send(error.message)
        }

    },
    //
 
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
            await Wishlist.findByIdAndUpdate(req.params.id, {$push: {slug: req.body}})
            return res.json({message: "Novo favorito adicionado"});
        }catch(error){
            return res.send(error.message)
        }
    },

    /*async removeFavorite(req, res){

        try {
            const wishlistData = await Wishlist.findById(req.params.id);
            const favSlug = req.body;
            const favIndex = wishlistData.favorites.findIndex(item => item.slug == favSlug);
            wishlistData.favorites.splice(favIndex,1);
            await Wishlist.findByIdAndUpdate(req.params.id, {$set: wishlistData})

            return res.json({message: "Favorito removido"});
        }catch(error){
            return res.send(error.message)
        }
    },*/

    async deleteWishlist(req, res){

        try {
            await Wishlist.findByIdAndRemove(req.params.id)
            return res.json({message: "Lista de desejos excluída"});
        }catch(error){
            return res.send(error.message)
        }
    }

}