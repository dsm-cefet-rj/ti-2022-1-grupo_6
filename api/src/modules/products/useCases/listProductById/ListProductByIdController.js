class ListProductByIdController {
  constructor(listProductByIdUseCase) {
    this.listProductByIdUseCase = listProductByIdUseCase;
  }

  async handle(request, response) {
    const { productId } = request.params;

    const product = await this.listProductByIdUseCase.execute(productId);

    return response.json(product);
  }
}

exports.ListProductByIdController = ListProductByIdController;
