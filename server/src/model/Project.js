/* eslint no-return-await:0 */
const query = require('../lib/mysql');

class ProjectModel {
  async searchUser(name) {
    return await query(`SELECT * FROM user WHERE name = '${name}'`);
  }

  async searchProject(id) {
    return await query(`SELECT * FROM project WHERE id = ${id}`);
  }

  async addProject(data, user) {
    await query('INSERT INTO project SET ?', { name: data.name, description: data.description, ownerId: user.id });
    const res = await query('select max(id) from project');
    console.log(res[0]['max(id)']);
    const newProjectIds = user.projectIds ? `${user.projectIds},${res[0]['max(id)']}` : `${user.projectIds}${res[0]['max(id)']}`;
    return await query(`UPDATE user SET projectIds = '${newProjectIds}' WHERE id = '${user.id}'`);
  }
}

module.exports = new ProjectModel();
