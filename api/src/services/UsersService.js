const { compare, hash } = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { RequestError } = require('../errors/RequestError');
const { usersRepository } = require('../repositories/UsersRepository');

class UsersService {
  constructor(usersRepository) {
    this.usersRepository = usersRepository;
  }

  async authenticate({ email, password }) {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new RequestError('Email or password incorrect', 401);

    const isCorrectPassword = await compare(password, user.password);

    if (!isCorrectPassword)
      throw new RequestError('Email or password incorrect', 401);

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
      profile: {
        username: user.username,
        name: user.name,
        email,
        address: user.address,
      },
      token,
    };
  }

  async create({ username, name, email, password, address }) {
    const isUser = await this.usersRepository.findByEmail(email);

    if (isUser) throw new RequestError('User already exists', 400);

    const passwordHash = await hash(password, 8);

    await this.usersRepository.create({
      username,
      name,
      email,
      password: passwordHash,
      address,
    });
  }
}

exports.usersService = new UsersService(usersRepository);
