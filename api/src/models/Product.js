const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },

    owner: String,

    questions: [
      {
        user: String,
        question: String,
        answer: String,
      },
    ],

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
