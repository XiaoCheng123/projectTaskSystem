/* eslint no-return-await:0 */
const query = require('../lib/mysql');

class UserModel {
  async findUserProfile() {
    return await query('SELECT * FROM user');
    // return await mysql.query('select * from user');
  }

  async hasId(id) {
    return await query(`SELECT * FROM user where id = '${id}'`);
  }

  async updateUser(user) {
    return await query(`UPDATE user SET name = '${user.name}', email = '${user.email}', passwd = '${user.passwd}'   WHERE id = '${user.id}'`);
  }

  async login(name) {
    return await query(`SELECT * FROM user where name = '${name}'`);
  }

  async hasName(name) {
    return await query(`SELECT * FROM user where name = '${name}'`);
  }

  async register(data) {
    return await query('INSERT INTO user SET ?', { name: data.name, email: data.email, passwd: data.passwd });
  }

  async getUserById(id) {
    return await query(`SELECT * FROM user where id = '${id}'`);
  }
}

module.exports = new UserModel();
