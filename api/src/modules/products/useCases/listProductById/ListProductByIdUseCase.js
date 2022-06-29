class ListProductByIdUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(productId) {
    return await this.productsRepository.findById(productId);
  }
}

exports.ListProductByIdUseCase = ListProductByIdUseCase;
