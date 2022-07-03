const { compare, hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { usersRepository } = require('../repositories/UsersRepository');

class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async authenticate({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new Error('Email or password incorrect');

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword) throw new Error('Email or password incorrect');

    const token = jwt.sign(
      {
        // payload
      },
      process.env.JWT_SECRET_KEY,
      {
        subject: user.id,
        expiresIn: '1d',
      }
    );

    return {
      user: {
        name: user.name,
        email,
      },
      token,
    };
  }

  async create({ name, email, password, address }) {
    const isUser = await this.usersRepository.findByEmail(email);

    if (isUser) throw new Error('User already exists');

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      name,
      email,
      password: passwordHash,
      address,
    });
  }
}

exports.usersService = new UsersService(usersRepository);
