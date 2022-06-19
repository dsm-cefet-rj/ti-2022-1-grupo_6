class ListProductsUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute() {
    return await this.productsRepository.list();
  }
}

exports.ListProductsUseCase = ListProductsUseCase;
