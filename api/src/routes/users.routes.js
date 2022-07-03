const { Router } = require('express');
const passport = require('passport');
const { usersController } = require('../controllers/UsersController');

const usersRoutes = Router();

usersRoutes.get(
  '/me',
  passport.authenticate('jwt', { session: false }),
  (request, response) => {
    return usersController.me(request, response);
  }
);

usersRoutes.post('/signup', (request, response) => {
  return usersController.signup(request, response);
});

usersRoutes.post('/signin', (request, response) => {
  return usersController.signin(request, response);
});

exports.usersRoutes = usersRoutes;
