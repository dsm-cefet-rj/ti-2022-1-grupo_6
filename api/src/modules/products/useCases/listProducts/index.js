const { ProductsRepository } = require('../../repositories/ProductsRepository');
const { ListProductsController } = require('./ListProductsController');
const { ListProductsUseCase } = require('./ListProductsUseCase');

const productsRepository = ProductsRepository.getInstance();
const listProductsUseCase = new ListProductsUseCase(productsRepository);
const listProductsController = new ListProductsController(listProductsUseCase);

exports.listProductsController = listProductsController;
