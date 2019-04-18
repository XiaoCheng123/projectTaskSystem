const userService = require('../service/user');

class UserController {
  async profile(ctx) {
    const res = await userService.profile();
    ctx.body = res.data;
  }

  async login(ctx) {
    const data = ctx.request.body;
    console.log(data);

    const res = await userService.login(data.username);
    console.log(res);

    if (res.length === 0) {
      ctx.body = {
        status: 203, // 找不到用户
        statusText: 'ok',
      };
    } else if (res[0].passwd !== data.password) {
      ctx.body = {
        status: 204, // 密码错误
        statusText: 'ok',
      };
    } else {
      ctx.body = {
        status: 200,
        statusText: 'ok',
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
