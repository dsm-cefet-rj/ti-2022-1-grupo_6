const mongoose = require('mongoose');
const { Schema } = mongoose;
//const normalize = require('normalize-mongoose');

const wishlistSchema = new Schema({
    listName: {
        type: String,
        required: true,
    },
    favorites: {
        slug: {
            type: String,
            required: false,
        }
    }
})

//wishlistSchema.plugin(normalize);

var Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;