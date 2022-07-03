const { default: mongoose } = require('mongoose');
const { Product } = require('../models/Product');

class ProductsRepository {
  constructor() {
    this.Product = Product;
  }

  async create(data) {
    const product = new this.Product(data);

    await product.save();
  }

  async createQuestion(product, data) {
    product.questions.push(data);

    await product.save();
  }

  async findById(productId) {
    if (mongoose.isObjectIdOrHexString(productId))
      return await this.Product.findById(productId).populate(
        'user',
        '-password'
      );
  }

  async findBySlug(productSlug) {
    const product = this.productsRepository.find(
      (product) => product.slug === productSlug
    );
    return product;
  }

  async update({ product, data }) {
    Object.assign(product, data);
    product = await product.save();
    return product;
  }

  async delete(product) {
    await product.remove();

    return product;
  }

  async list() {
    const products = await this.Product.find();
    return products;
  }
}

exports.productsRepository = new ProductsRepository();
