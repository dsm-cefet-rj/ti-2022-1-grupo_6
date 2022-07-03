const { productsService } = require('../services/ProductsService');

class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  async create(request, response) {
    const { body: data } = request;

    await this.productsService.create(data, request.user);

    return response.status(201).json();
  }

  async list(request, response) {
    const products = await this.productsService.list();

    return response.json(products);
  }

  async listById(request, response) {
    const { productId } = request.params;

    const product = await this.productsService.listById(productId);

    return response.json(product);
  }

  async deleteById(request, response) {
    const { productId } = request.params;

    const deletedProduct = await this.productsService.deleteById(productId);

    return response.json(deletedProduct);
  }

  async createQuestion(request, response) {
    const { productId } = request.params;
    const { body: data } = request;

    await this.productsService.createQuestion(productId, data);

    return response.status(201).json();
  }

  async update(request, response) {
    const { productId } = request.params;
    const { body: data } = request;

    const updatedProduct = await this.productsService.update({
      productId,
      data,
    });

    return response.json(updatedProduct);
  }

  async uploadImage(request, response) {
    const {
      file: { filename },
    } = request;

    try {
      const imageUrl = await this.productsService.uploadImage(filename);

      return response.json({ imageUrl: imageUrl });
    } catch (err) {
      throw err;
    }
  }

  async signup(request, response) {
    const { body: data } = request;

    await this.productsService.create(data);

    return response.status(201).json();
  }
}

exports.productsController = new ProductsController(productsService);
