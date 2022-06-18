const express = require('express');
const routes = express.Router();
require('dotenv').config()

const paymentsController = require('../controllers/paymentsController');

routes.post('/checkout', paymentsController.checkout)

module.exports = routes;