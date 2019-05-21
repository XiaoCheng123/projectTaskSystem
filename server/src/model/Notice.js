/* eslint-disable no-return-await */
const query = require('../lib/mysql');

const date = new Date();

class NoticetModel {
  async addNotic(data, user) {
    await query('INSERT INTO notice SET ?', { name: user.name, description: data.description, time: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}` });
    const res = await query('select max(id) from notice');
    console.log(res[0]['max(id)']);
    const newNoticeIds = user.noticeIds !== null && user.noticeIds !== 'null' ? `${user.noticeIds},${res[0]['max(id)']}` : `${res[0]['max(id)']}`;
    return await query(`UPDATE user SET noticeIds = '${newNoticeIds}' WHERE id = '${user.id}'`);
  }

  async searchNotice(id) {
    return await query(`SELECT * FROM notice WHERE id = ${id}`);
  }
}

module.exports = new NoticetModel();
