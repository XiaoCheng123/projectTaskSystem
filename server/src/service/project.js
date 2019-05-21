/* eslint-disable no-return-await */
const ProjectModel = require('../model/Project');
const UserModel = require('../model/User');
const TaskModel = require('../model/Task');
const NoticeModel = require('../model/Notice');

class ProjectService {
  async searchUser(name) {
    const data = await ProjectModel.searchUser(name);
    return data[0];
  }

  async getProject(id) {
    return await ProjectModel.searchProject(id);
  }

  async searchProject(projectIds) {
    const idArray = projectIds.split(',');
    const data = await Promise.all(idArray.map(async (id) => {
      const project = await ProjectModel.searchProject(id);
      return project[0];
    }));
    return data;
  }

  async addProject(data, user) {
    const res = await ProjectModel.addProject(data, user);
    return res;
  }

  async addPerson(data) {
    const user = await UserModel.getUserById(data.selectUser);
    if (user[0].projectIds && !user[0].projectIds.split(',').includes(`${data.projectValue}`)) {
      console.log('addPerson1');
      const res = await ProjectModel.addPerson2(data, user);
      return res;
    }
    const res = await ProjectModel.addPerson1(data);
    return res;
  }

  async deleteMerber(data) {
    const res = await ProjectModel.deleteMerber(data);
    return res;
  }

  async getNotice(userId) {
    const user = await UserModel.hasId(userId);
    if (user[0].noticeIds === null || user[0].noticeIds === 'null') {
      return [];
    }
    const idArray = user[0].noticeIds.split(',');
    const data = await Promise.all(idArray.map(async (id) => {
      const notice = await NoticeModel.searchNotice(id);
      return notice[0];
    }));
    return data;
  }

  async getTask(projectId) {
    const projectValue = await ProjectModel.searchProject(projectId);
    if (projectValue[0].taskIds === null || projectValue[0].noticeIds === 'null') {
      return [];
    }
    const idArray = projectValue[0].taskIds.split(',');
    const data = await Promise.all(idArray.map(async (id) => {
      const task = await TaskModel.searchTask(id);
      return task[0];
    }));
    return data;
  }

  async updateTask(id) {
    return await TaskModel.updateTask(id);
  }

  async addTask(data) {
    const project = await ProjectModel.searchProject(data.projectValue);
    const res = await ProjectModel.addTask(data, project[0]);
    return res;
  }
}

module.exports = new ProjectService();
