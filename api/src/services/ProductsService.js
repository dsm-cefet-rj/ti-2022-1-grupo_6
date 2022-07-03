const { productsRepository } = require('../repositories/ProductsRepository');
const { s3Repository } = require('../repositories/S3Repository');

class ProductsService {
  constructor(productsRepository, s3Repository) {
    this.productsRepository = productsRepository;
    this.s3Repository = s3Repository;
  }

  async create(data, user) {
    return await this.productsRepository.create(data, user);
  }

  async list() {
    return await this.productsRepository.list();
  }

  async listById(productId) {
    return await this.productsRepository.findById(productId);
  }

  async deleteById(productId) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new Error('Product does not exists');

    const productDeleted = await this.productsRepository.delete(product);

    return productDeleted;
  }

  async createQuestion(productId, data) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new Error('Product does not exists');

    return await this.productsRepository.createQuestion(product, data);
  }

  async update({ productId, data }) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new Error('Product does not exists');

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
