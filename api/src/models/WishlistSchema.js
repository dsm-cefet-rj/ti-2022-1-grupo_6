const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema({
    listName: {
        type: String,
        required: true,
    },
    /*userId: {
        type: String,
        require: true,
    },*/
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    favorites: [{
        slug: {
            type: String,
            required: false,
        }
    }]
})

var Wishlist = mongoose.model("Wishlist", wishlistSchema);

module.exports = Wishlist;