const express = require('express');
require('dotenv').config();
require('express-async-errors');
const { connectDB } = require('./config/db');

const cors = require('cors');

const routes = require('./routes');

const app = express();

connectDB();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', routes);

const port = process.env.PORT || 5000;

app.use((err, request, response, next) => {
  return response.status(400).json({
    message: err.message,
  });
});

app.listen(port, function (err) {
  if (err) console.error(err);
  console.log('API INICIADA NA PORTA 5000');
});
