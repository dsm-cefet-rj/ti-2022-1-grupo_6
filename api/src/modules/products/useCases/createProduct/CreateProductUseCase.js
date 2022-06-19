class CreateProductUseCase {
  constructor(productsRepository) {
    this.productsRepository = productsRepository;
  }

  async execute(data, imageFile) {
    return await this.productsRepository.create(data, imageFile);
  }
}

exports.CreateProductUseCase = CreateProductUseCase;
