const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    // user|ownerId: Schema.Types.ObjectID, later we'll need the user reference, product 0..* -belongs- 1..1 user
    owner: String,

    questions: [[Number]],

    likes: {
      type: Number,
      default: () => 0,
    },
    title: String,

    price: Number,

    amount: Number,

    state: String,

    new: Boolean,

    overview: String,

    imageUrl: String,

    description: String,

    slug: String,
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
exports.Product = Product;
