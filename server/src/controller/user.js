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

  async getUser(ctx) {
    const res = await userService.getUser();
    ctx.body = {
      status: 200,
      data: res,
    };
  }

  async updateUser(ctx) {
    const data = ctx.request.body;

    const user = await userService.hasId(data.id);
    console.log(data);
    console.log(user[0]);

    const newUser = {
      id: user[0].id,
      name: user[0].name,
      email: user[0].email,
      passwd: user[0].passwd,
    };

    // const res = await userService.updateUser(newUser);

    ctx.body = {
      status: 200,
    };
  }
}

module.exports = new UserController();
