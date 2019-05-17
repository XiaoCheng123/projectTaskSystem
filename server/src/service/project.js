const ProjectModel = require('../model/Project');

class ProjectService {
  async searchUser(name) {
    const data = await ProjectModel.searchUser(name);
    return data[0];
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
}

module.exports = new ProjectService();
