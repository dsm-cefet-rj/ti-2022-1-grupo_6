class CreateProductController {
  constructor(createProductUseCase) {
    this.createProductUseCase = createProductUseCase;
  }

  async handle(request, response) {
    const { body: data } = request;
    const { file: imageFile } = request;

    await this.createProductUseCase.execute(data, imageFile);

    return response.status(201).json();
  }
}

exports.CreateProductController = CreateProductController;
