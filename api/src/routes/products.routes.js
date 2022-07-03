const { Router } = require('express');
const passport = require('passport');
const { productsController } = require('../controllers/ProductsController');
const { upload } = require('../middlewares/uploadImageMiddleware');

const productsRoutes = Router();

productsRoutes.get('/', (request, response) => {
  return productsController.list(request, response);
});

productsRoutes.get('/:productId', (request, response) => {
  return productsController.listById(request, response);
});

productsRoutes.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    return productsController.create(request, response);
  }
);

productsRoutes.post(
  '/:productId/questions',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    return productsController.createQuestion(request, response);
  }
);

productsRoutes.post(
  '/upload-image',
  passport.authenticate('jwt', { session: false }),
  upload.single('image'),
  (request, response) => {
    return productsController.uploadImage(request, response);
  }
);

productsRoutes.put(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  async (request, response) => {
    return productsController.update(request, response);
  }
);

productsRoutes.delete(
  '/:productId',
  passport.authenticate('jwt', { session: false }),
  async (request, response) => {
    return productsController.deleteById(request, response);
  }
);

exports.productsRoutes = productsRoutes;
