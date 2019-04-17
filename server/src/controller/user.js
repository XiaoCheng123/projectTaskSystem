const userService = require('../service/user');

class UserController {
  async profile(ctx) {
    const res = await userService.profile();
    ctx.body = res.data;
  }

  async login(ctx) {
    const { username, password } = ctx.query;

    if (username === 'admin' && password === 'admin') {
      ctx.body = {
        status: 200,
        statusText: 'ok',
      };
    } else if (username === 'user' && password === 'user') {
      ctx.body = {
        status: 200,
        statusText: 'ok',
      };
    } else {
      ctx.body = {
        status: 401,
        statusText: 'unauthorized',
      };
    }
  }

  async register(ctx) {
    const data = ctx.request.body;

    const res = await userService.hasName(data.name);

    if (res.length !== 0) {
      ctx.body = {
        status: 203,
        statusText: 'ok',
      };
    } else {
      await userService.register(data);
      ctx.body = {
        status: 200,
        statusText: 'ok',
      };
    }
  }

  async logout(ctx) {
    ctx.body = {
      status: 200,
      statusText: 'ok',
    };
  }
}

module.exports = new UserController();
