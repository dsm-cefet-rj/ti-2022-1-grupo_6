const { Router } = require('express');
const {
  createProductController,
} = require('../modules/products/useCases/createProduct');
const {
  listProductsController,
} = require('../modules/products/useCases/listProducts');
const {
  uploadProductImageController,
} = require('../modules/products/useCases/uploadProductImage');
const {
  updateProductController,
} = require('../modules/products/useCases/updateProduct');
const {
  deleteProductController,
} = require('../modules/products/useCases/deleteProduct');
const {
  listProductByIdController,
} = require('../modules/products/useCases/listProductById');
const {
  createQuestionController,
} = require('../modules/products/useCases/createQuestion');
const { upload } = require('../middlewares/uploadImageMiddleware');

const productsRoutes = Router();

productsRoutes.get('/', (request, response) => {
  return listProductsController.handle(request, response);
});

productsRoutes.get('/:productId', (request, response) => {
  return listProductByIdController.handle(request, response);
});

productsRoutes.post('/', (request, response) => {
  return createProductController.handle(request, response);
});

productsRoutes.post('/:productId/questions', (request, response) => {
  return createQuestionController.handle(request, response);
});

productsRoutes.post(
  '/upload-image',
  upload.single('image'),
  (request, response) => {
    return uploadProductImageController.handle(request, response);
  }
);

productsRoutes.put('/:productId', async (request, response) => {
  return updateProductController.handle(request, response);
});

productsRoutes.delete('/:productId', async (request, response) => {
  return deleteProductController.handle(request, response);
});

exports.productsRoutes = productsRoutes;
