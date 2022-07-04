const mongoose = require('mongoose');
const { productsRepository } = require('../repositories/ProductsRepository');
const { s3Repository } = require('../repositories/S3Repository');
const slugify = require('slugify');
const { RequestError } = require('../errors/RequestError');
class ProductsService {
  constructor(productsRepository, s3Repository) {
    this.productsRepository = productsRepository;
    this.s3Repository = s3Repository;
  }

  async create(data, user) {
    const slug =
      slugify(data.owner, { lower: true }) +
      '-' +
      slugify(data.title, {
        lower: true,
      });

    const productData = { ...data, slug, user: user.id };

    return await this.productsRepository.create(productData);
  }

  async list() {
    return await this.productsRepository.list();
  }

  async listByParam(productParam) {
    if (mongoose.isObjectIdOrHexString(productParam))
      return await this.productsRepository.findById(productParam);

    return await this.productsRepository.findBySlug(productParam);
  }

  async deleteById(productId, user) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new RequestError('Product does not exists', 404);

    if (product.user.id !== user.id) throw new RequestError('Forbidden', 403);

    const productDeleted = await this.productsRepository.delete(product);

    return productDeleted;
  }

  async createQuestion(productId, data, user) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new RequestError('Product does not exists', 404);

    const questionData = { ...data, user };

    return await this.productsRepository.createQuestion(product, questionData);
  }

  async update({ productId, data, user }) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new RequestError('Product does not exists', 404);

    if (product.user.id !== user.id) throw new RequestError('Forbidden', 403);

    const updatedProduct = await this.productsRepository.update({
      product,
      data,
    });

    return updatedProduct;
  }

  async uploadImage(filename) {
    const imageUrl = await this.s3Repository.uploadProductImage(filename);

    return imageUrl;
  }
}

exports.productsService = new ProductsService(productsRepository, s3Repository);
