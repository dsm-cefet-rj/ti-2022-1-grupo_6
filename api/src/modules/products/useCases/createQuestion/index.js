const { ProductsRepository } = require('../../repositories/ProductsRepository');
const { CreateQuestionController } = require('./CreateQuestionController');
const { CreateQuestionUseCase } = require('./CreateQuestionUseCase');

const productsRepository = ProductsRepository.getInstance();

const createQuestionUseCase = new CreateQuestionUseCase(productsRepository);

const createQuestionController = new CreateQuestionController(
  createQuestionUseCase
);

exports.createQuestionController = createQuestionController;
