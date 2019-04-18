/* eslint no-return-await:0 */
const query = require('../lib/mysql');

class UserModel {
  async findUserProfile() {
    const data = await query('SELECT * FROM user');
    console.log(data);
    // return await mysql.query('select * from user');
  }

  async login(name) {
    return await query(`SELECT * FROM user where name = ${name}`);
  }

  async hasName(name) {
    return await query(`SELECT * FROM user where name = ${name}`);
  }

  async register(data) {
    return await query('INSERT INTO user SET ?', { name: data.name, email: data.email, passwd: data.passwd });
  }
}

module.exports = new UserModel();
