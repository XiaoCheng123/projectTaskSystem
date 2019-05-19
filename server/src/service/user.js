const UserModel = require('../model/User');

class UserService {
  async getUser() {
    const data = await UserModel.findUserProfile();
    return data;
  }

  async profile(name) {
    const data = await UserModel.hasName(name);
    return { data };
  }

  async login(name) {
    const data = await UserModel.hasName(name);
    return data;
  }

  async hasName(name) {
    const data = await UserModel.hasName(name);
    return data;
  }

  async register(data) {
    const res = await UserModel.register(data);
    return res;
  }
}

module.exports = new UserService();
