const userService = require('../service/user');

class UserController {
  async profile(ctx) {
    if (ctx.session.user === undefined || ctx.session.user === '') {
      ctx.body = {
        status: 302, // 未登录
        statusText: 'ok',
      };
    } else {
      const res = await userService.profile(ctx.session.user);
      ctx.body = {
        status: 200, // 已经登录
        statusText: 'ok',
        data: res.data[0],
      };
    }
  }

  async login(ctx) {
    const data = ctx.request.body;

    const res = await userService.login(data.username);

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
      ctx.session.user = data.username;
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
    ctx.session.user = '';

    ctx.body = {
      status: 200,
      statusText: 'ok',
    };
  }
}

module.exports = new UserController();
