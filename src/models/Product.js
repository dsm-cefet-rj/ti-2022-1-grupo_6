const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionSchema = new Schema({
  user: {
    name: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      require: true,
    },

    email: {
      type: String,
      required: true,
    },
  },

  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
  },
});

const ProductSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
      required: true,
    },

    owner: {
      type: String,
      required: true,
    },

    questions: [questionSchema],

    likes: {
      type: Number,
      default: () => 0,
    },

    title: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    new: {
      type: Boolean,
      required: true,
    },

    overview: {
      type: String,
      required: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);
exports.Product = Product;
