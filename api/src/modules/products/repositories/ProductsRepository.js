const { Product } = require('../models/Product');
const slugify = require('slugify');

class ProductsRepository {
  constructor() {
    this.productsRepository = [
      {
        id: '46476db2-20f4-49dd-a29b-ad6893d5e3e4',
        likes: 0,
        questions: [],
        owner: 'Felipe',
        title: 'My GPU',
        price: 50000,
        amount: 5,
        state: 'Rio de Janeiro',
        used: 'novo',
        overview: 'some overview',
        imageUrl:
          'https://felipecurciopsw.s3.amazonaws.com/images/image-1655906673810-174revan.jpg',
        description: 'Some detailed description',
        slug: 'felipe-my-gpu',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  static instance = null;

  static getInstance() {
    if (ProductsRepository.instance === null)
      ProductsRepository.instance = new ProductsRepository();
    return ProductsRepository.instance;
  }

  async create(data) {
    const product = new Product();

    const slug =
      slugify(data.owner, { lower: true }) +
      '-' +
      slugify(data.title, {
        lower: true,
      });

    Object.assign(product, data, {
      slug,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    this.productsRepository.push(product);
  }

  async findById(productId) {
    const product = this.productsRepository.find(
      (product) => product.id === productId
    );
    return product;
  }

  async findBySlug(productSlug) {
    const product = this.productsRepository.find(
      (product) => product.slug === productSlug
    );
    return product;
  }

  async update({ product, data }) {
    Object.assign(product, data, { updatedAt: new Date() });

    return product;
  }

  async delete(productId) {
    const product = this.findById(productId);

    const productIdx = this.productsRepository.indexOf(product);

    this.productsRepository.splice(productIdx, 1);

    return product;
  }

  async list() {
    const products = this.productsRepository;
    return products;
  }
}
exports.ProductsRepository = ProductsRepository;
