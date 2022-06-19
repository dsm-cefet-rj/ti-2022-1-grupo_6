const { ProductsRepository } = require('../../repositories/ProductsRepository');
const { CreateProductController } = require('./CreateProductController');
const { CreateProductUseCase } = require('./CreateProductUseCase');

const productsRepository = ProductsRepository.getInstance();

const createProductUseCase = new CreateProductUseCase(productsRepository);

const createProductController = new CreateProductController(
  createProductUseCase
);

exports.createProductController = createProductController;
