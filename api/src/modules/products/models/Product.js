const { v4: uuidV4 } = require('uuid');

class Product {
  constructor() {
    this.id = uuidV4();
    this.likes = 0;
    this.questions = [];
  }
}

exports.Product = Product;
