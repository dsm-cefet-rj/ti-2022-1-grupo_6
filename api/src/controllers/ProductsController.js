const { productsService } = require('../services/ProductsService');

class ProductsController {
  constructor(productsService) {
    this.productsService = productsService;
  }

  async create(request, response) {
    const { body: data } = request;

    await this.productsService.create(data, request.user.profile);

    return response.status(201).json();
  }

  async list(request, response) {
    const products = await this.productsService.list();

    return response.json(products);
  }

  async listParam(request, response) {
    const { productParam } = request.params;

    const product = await this.productsService.listByParam(productParam);

    return response.json(product);
  }

  async deleteById(request, response) {
    const { productId } = request.params;

    const deletedProduct = await this.productsService.deleteById(
      productId,
      request.user.profile
    );

    return response.json(deletedProduct);
  }

  async createQuestion(request, response) {
    const { productId } = request.params;
    const { body: data } = request;

    await this.productsService.createQuestion(
      productId,
      data,
      request.user.profile
    );

    return response.status(201).json();
  }

  async update(request, response) {
    const { productId } = request.params;
    const { body: data } = request;

    const updatedProduct = await this.productsService.update({
      productId,
      data,
      user: request.user.profile,
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

  async createQuestionAnswer(request, response) {
    const { productId, questionId } = request.params;
    const { body: data } = request;

    await this.productsService.createQuestionAnswer(
      productId,
      questionId,
      data
    );

    return response.status(201).json();
  }
}

exports.productsController = new ProductsController(productsService);
