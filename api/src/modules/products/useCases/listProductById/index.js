const { ProductsRepository } = require('../../repositories/ProductsRepository');
const { ListProductByIdUseCase } = require('./ListProductByIdUseCase');
const { ListProductByIdController } = require('./ListProductByIdController');

const productsRepository = ProductsRepository.getInstance();
const listProductByIdUseCase = new ListProductByIdUseCase(productsRepository);
const listProductByIdController = new ListProductByIdController(
  listProductByIdUseCase
);

exports.listProductByIdController = listProductByIdController;
