const { Product } = require('../models/Product');
const slugify = require('slugify');

class ProductsRepository {
  constructor() {
    this.productsRepository = [];
  }

  static instance = null;

  static getInstance() {
    if (this.instance === null) this.instance = new ProductsRepository();
    return this.instance;
  }

  async create(data, imageFile) {
    const product = new Product();

    const slug =
      slugify(data.owner, { lower: true }) +
      '-' +
      slugify(data.title, {
        lower: true,
      });

    Object.assign(product, data, { slug });

    this.productsRepository.push(product);
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
    Object.assign(product, data);

    return product;
  }

  async delete(productId) {
    const product = this.findById(productId);

    const productIdx = this.productsRepository.indexOf(product);

    this.productsRepository.splice(productIdx, 1);

    return product;
  }

  async list() {
    const products = this.productsRepository;
    return products;
  }
}
exports.ProductsRepository = ProductsRepository;
