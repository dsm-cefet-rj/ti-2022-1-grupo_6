const { Product } = require('../models/Product');
const slugify = require('slugify');

class ProductsRepository {
  constructor() {
    this.Product = Product;
  }

  async create(data) {
    const slug =
      slugify(data.owner, { lower: true }) +
      '-' +
      slugify(data.title, {
        lower: true,
      });

    const productData = { ...data, slug };

    const product = new this.Product(productData);

    await product.save();
  }

  async createQuestion(product, data) {
    product.questions.push(data);

    await product.save();
  }

  async findById(productId) {
    const product = await this.Product.findById(productId);
    return product;
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
