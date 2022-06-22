class CreateProductController {
  constructor(createProductUseCase) {
    this.createProductUseCase = createProductUseCase;
  }

  async handle(request, response) {
    const { body: data } = request;

    await this.createProductUseCase.execute(data);

    return response.status(201).json();
  }
}

exports.CreateProductController = CreateProductController;
