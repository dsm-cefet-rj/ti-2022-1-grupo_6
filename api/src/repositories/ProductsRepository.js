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
    return await this.Product.findById(productId).populate('user', '-password');
  }

  async findBySlug(productSlug) {
    return await this.Product.findOne({ slug: productSlug });
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

  async createQuestionAnswer(product, question, data) {
    question.answer = data;

    await product.save();
  }

  async listByQuery(productName) {
    const query = new RegExp(productName, 'i');
    const products = await this.Product.find({ title: query });

    return products;
  }
}

exports.productsRepository = new ProductsRepository();
