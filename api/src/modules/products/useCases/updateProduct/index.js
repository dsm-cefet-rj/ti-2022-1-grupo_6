const { ProductsRepository } = require('../../repositories/ProductsRepository');
const { UpdateProductUseCase } = require('./UpdateProductUseCase');
const { UpdateProductController } = require('./UpdateProductController');

const productsRepository = ProductsRepository.getInstance();
const updateProductUseCase = new UpdateProductUseCase(productsRepository);
const updateProductController = new UpdateProductController(
  updateProductUseCase
);

exports.updateProductController = updateProductController;
