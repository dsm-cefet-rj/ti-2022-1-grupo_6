class DeleteProductUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(productId) {
    const productDeleted = await this.productsRepository.delete(productId);
    return productDeleted;
  }
}

exports.DeleteProductUseCase = DeleteProductUseCase;
