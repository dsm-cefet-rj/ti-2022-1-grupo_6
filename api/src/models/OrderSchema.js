const mongoose = require('mongoose');
const { Schema } = mongoose;
//const normalize = require('normalize-mongoose');

const orderSchema = new Schema({
    totalPrice: {
        type: Number,
        required: true
    },
    buyer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Users',
        required: true,
    },
    discount: {
        type: Number,
        required: false,
    }
})

//wishlistSchema.plugin(normalize);

var Order = mongoose.model("Order", orderSchema);

module.exports = Order;