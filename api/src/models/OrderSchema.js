const mongoose = require('mongoose');
const { Schema } = mongoose;
//const normalize = require('normalize-mongoose');

const orderSchema = new Schema({
    unitPrice: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true,
    }
})

//wishlistSchema.plugin(normalize);

var Order = mongoose.model("Order", orderSchema);

module.exports = Order;