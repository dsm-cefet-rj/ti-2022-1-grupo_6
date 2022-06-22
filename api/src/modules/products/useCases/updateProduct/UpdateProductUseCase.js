class UpdateProductUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute({ productId, data }) {
    const product = await this.productsRepository.findById(productId);

    if (!product) throw new Error('Product does not exists');

    const updatedProduct = await this.productsRepository.update({
      product,
      data,
    });

    return updatedProduct;
  }
}

exports.UpdateProductUseCase = UpdateProductUseCase;
