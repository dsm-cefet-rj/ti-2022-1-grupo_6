class UpdateProductController {
  constructor(updateProductUseCase) {
    this.updateProductUseCase = updateProductUseCase;
  }

  async handle(request, response) {
    const { productId } = request.params;
    const { body: data } = request;

    const updatedProduct = await this.updateProductUseCase.execute({
      productId,
      data,
    });

    return response.json(updatedProduct);
  }
}

exports.UpdateProductController = UpdateProductController;
