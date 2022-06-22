require('dotenv').config()
const { v4 } = require("uuid");

const wishlist = [
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
  ];

module.exports = {

    async getWishlist(req, res){
        const {wishlistId} = req.params;
        const wishlistIndex = wishlist.findIndex(item =>item.id == wishlistId);

        try {
            return res.json(wishlist[wishlistIndex]);
        }catch(error){
            return res.send(error.message)
        }
    },

    async getAllWishlists(req, res){
        try {
            return res.json({wishlist});
        }catch(error){
            return res.send(error.message)
        }
    },
 
    async createWishlist(req, res){
        const newWishlist = req.body;
        Object.assign(newWishlist);

        try {
            return res.json({message: "Lista de desejos criada"});
        }catch(error){
            return res.send(error.message)
        }
    },

    async createFavorite(req, res){
        const {wishlistId} = req.params;
        const {newSlug} = req.body;
        const wishlistIndex = wishlist.findIndex(item =>item.id == wishlistId);
        
        try {
            wishlist[wishlistIndex].favorites.push({newSlug});
            return res.json({message: "Novo favorito adicionado"});
        }catch(error){
            return res.send(error.message)
        }
    },

    async removeFavorite(req, res){
        const {wishlistId} = req.params;
        const {wishlistSlug} = req.body;
        const wishlistIndex = wishlist.findIndex(item =>item.id == wishlistId);
        const favoriteIndex = wishlist[wishlistIndex].favorites(item => item.slug == wishlistSlug);
        try {
            wishlist[wishlistIndex].favorites.splice(favoriteIndex,1);
            return res.json({message: "Favorito removido"});
        }catch(error){
            return res.send(error.message)
        }
    },

    async deleteWishlist(req, res){
        const {wishlistId} = req.params;
        const wishlistIndex = wishlist.findIndex(item =>item.id == wishlistId);

        try {
            wishlist.splice(wishlistIndex, 1);
            return res.json({message: "Lista de desejos excluída"});
        }catch(error){
            return res.send(error.message)
        }
    }

}