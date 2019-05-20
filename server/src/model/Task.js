/* eslint-disable no-return-await */
const query = require('../lib/mysql');

class TaskModel {
  async searchTask(id) {
    return await query(`SELECT * FROM task WHERE id = ${id}`);
  }

  async updateTask(id) {
    return await query(`UPDATE task SET status = 1 WHERE id = '${id}'`);
  }
}

module.exports = new TaskModel();
