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
    const newProjectIds = user.projectIds !== null && user.projectIds !== 'null' ? `${user.projectIds},${res[0]['max(id)']}` : `${res[0]['max(id)']}`;
    return await query(`UPDATE user SET projectIds = '${newProjectIds}' WHERE id = '${user.id}'`);
  }

  async addTask(data, project) {
    console.log(data);
    await query('INSERT INTO task SET ?', { name: data.name, description: data.description, status: 0 });
    const res = await query('select max(id) from task');
    console.log(res);
    console.log(project);
    const newTaskIds = project.taskIds !== null && project.taskIds !== 'null' ? `${project.taskIds},${res[0]['max(id)']}` : `${res[0]['max(id)']}`;
    return await query(`UPDATE project SET taskIds = '${newTaskIds}' WHERE id = '${project.id}'`);
  }

  async addPerson1(data) {
    const res = await query(`UPDATE user SET projectIds = '${data.projectValue}' WHERE id = '${data.selectUser}'`);
    return res;
  }

  async addPerson2(data, user) {
    const res = await query(`UPDATE user SET projectIds = '${user[0].projectIds},${data.projectValue}' WHERE id = '${data.selectUser}'`);
    return res;
  }

  async deleteMerber(data) {
    console.log(data.user);
    const array = data.user.projectIds.split(',');
    array.splice(array.findIndex((value) => {
      return value === (`${data.projectId}`);
    }), 1);
    const string = array.join(',');
    console.log(string);
    const res = await query(`UPDATE user SET projectIds = '${string}' WHERE id = '${data.user.id}'`);
    return res;
  }
}

module.exports = new ProjectModel();
