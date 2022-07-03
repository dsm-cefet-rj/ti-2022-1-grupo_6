const { Router } = require('express');
const { productsController } = require('../controllers/ProductsController');
const { upload } = require('../middlewares/uploadImageMiddleware');

const productsRoutes = Router();

productsRoutes.get('/', (request, response) => {
  return productsController.list(request, response);
});

productsRoutes.get('/:productId', (request, response) => {
  return productsController.listById(request, response);
});

productsRoutes.post('/', (request, response) => {
  return productsController.create(request, response);
});

productsRoutes.post('/:productId/questions', (request, response) => {
  return productsController.createQuestion(request, response);
});

productsRoutes.post(
  '/upload-image',
  upload.single('image'),
  (request, response) => {
    return productsController.uploadImage(request, response);
  }
);

productsRoutes.put('/:productId', async (request, response) => {
  return productsController.update(request, response);
});

productsRoutes.delete('/:productId', async (request, response) => {
  return productsController.deleteById(request, response);
});

exports.productsRoutes = productsRoutes;
