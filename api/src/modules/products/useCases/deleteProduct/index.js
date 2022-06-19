const { ProductsRepository } = require('../../repositories/ProductsRepository');
const { DeleteProductUseCase } = require('./DeleteProductUseCase');
const { DeleteProductController } = require('./DeleteProductController');

const productsRepository = ProductsRepository.getInstance();
const deleteProductUseCase = new DeleteProductUseCase(productsRepository);
const deleteProductController = new DeleteProductController(
  deleteProductUseCase
);

exports.deleteProductController = deleteProductController;
