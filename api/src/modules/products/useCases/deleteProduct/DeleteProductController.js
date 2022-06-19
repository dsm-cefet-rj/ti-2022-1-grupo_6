class DeleteProductController {
  constructor(deleteProductUseCase) {
    this.deleteProductUseCase = deleteProductUseCase;
  }

  async handle(request, response) {
    const { productId } = request.params;

    const deletedProduct = await this.deleteProductUseCase.execute(productId);

    return response.json(deletedProduct);
  }
}

exports.DeleteProductController = DeleteProductController;
