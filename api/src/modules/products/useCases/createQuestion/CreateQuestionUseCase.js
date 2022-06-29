class CreateQuestionUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(productId, data) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new Error('Product does not exists');

    return await this.productsRepository.createQuestion(product, data);
  }
}

exports.CreateQuestionUseCase = CreateQuestionUseCase;
