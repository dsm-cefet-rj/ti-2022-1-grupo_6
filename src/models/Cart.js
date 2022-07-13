const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true
    },

    products: {
        type: [{
            productId: String,

            quantity: {
                type: Number,
                default: 1
            }      
        }],
        require: true
    },
}, {
    timestamps: true
})

const CartModel = mongoose.model('Cart', CartSchema);

exports.CartModel = CartModel