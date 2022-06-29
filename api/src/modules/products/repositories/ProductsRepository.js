const { Product } = require('../models/Product');
const slugify = require('slugify');

class ProductsRepository {
  constructor() {
    this.Product = Product;
  }

  static instance = null;

  static getInstance() {
    if (ProductsRepository.instance === null)
      ProductsRepository.instance = new ProductsRepository();
    return ProductsRepository.instance;
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

  async findById(productId) {
    const product = this.productsRepository.find(
      (product) => product.id === productId
    );
    return product;
  }

  async findBySlug(productSlug) {
    const product = this.productsRepository.find(
      (product) => product.slug === productSlug
    );
    return product;
  }

  async update({ product, data }) {
    Object.assign(product, data, { updatedAt: new Date() });

    return product;
  }

  async delete(productId) {
    const product = this.findById(productId);

    const productIdx = this.productsRepository.indexOf(product);

    this.productsRepository.splice(productIdx, 1);

    return product;
  }

  async list() {
    const products = await this.Product.find();
    return products;
  }
}
exports.ProductsRepository = ProductsRepository;
