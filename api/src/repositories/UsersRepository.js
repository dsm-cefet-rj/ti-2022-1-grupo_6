const { UserModel } = require('../models/User');

class UsersRepository {
  constructor() {
    this.User = UserModel;
  }

  async create(data) {
    const user = new this.User(data);

    await user.save();
  }

  async findById(userId) {
    const user = await this.User.findById(userId);
    return user;
  }

  async findByEmail(userEmail) {
    const user = await this.User.findOne({ email: userEmail });
    return user;
  }
}

exports.usersRepository = new UsersRepository();
