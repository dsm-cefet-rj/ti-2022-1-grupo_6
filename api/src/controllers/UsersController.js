const { usersService } = require('../services/UsersService');

class UsersController {
  constructor(usersService) {
    this.usersService = usersService;
  }

  async me(request, response) {
    return response.json(request.user);
  }

  async signin(request, response) {
    const { body: data } = request;

    const user = await this.usersService.authenticate(data);

    return response.json(user);
  }

  async signup(request, response) {
    const { body: data } = request;

    await this.usersService.create(data);

    return response.status(201).json();
  }
}

exports.usersController = new UsersController(usersService);
