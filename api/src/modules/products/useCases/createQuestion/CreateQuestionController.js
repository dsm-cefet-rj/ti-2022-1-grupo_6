class CreateQuestionController {
  constructor(createQuestionUseCase) {
    this.createQuestionUseCase = createQuestionUseCase;
  }

  async handle(request, response) {
    const { productId } = request.params;
    const { body: data } = request;

    await this.createQuestionUseCase.execute(productId, data);

    return response.status(201).json();
  }
}

exports.CreateQuestionController = CreateQuestionController;
