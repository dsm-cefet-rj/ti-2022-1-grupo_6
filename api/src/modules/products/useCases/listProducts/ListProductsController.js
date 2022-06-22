class ListProductsController {
  constructor(listProductsUseCase) {
    this.listProductsUseCase = listProductsUseCase;
  }

  async handle(request, response) {
    const products = await this.listProductsUseCase.execute();

    return response.json(products);
  }
}

exports.ListProductsController = ListProductsController;
