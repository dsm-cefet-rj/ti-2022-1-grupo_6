class DeleteProductUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(productId) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new Error('Product does not exists');

    const productDeleted = await this.productsRepository.delete(product);

    return productDeleted;
  }
}

exports.DeleteProductUseCase = DeleteProductUseCase;