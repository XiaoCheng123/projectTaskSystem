const ProjectModel = require('../model/Project');
const UserModel = require('../model/User');

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

  async addPerson(data) {
    const user = await UserModel.getUserById(data.selectUser);
    if (user[0].projectIds !== null && !user[0].projectIds.split(',').includes(`${data.projectValue}`)) {
      const res = await ProjectModel.addPerson2(data, user);
      return res;
    } else if (user[0].projectIds === null) {
      const res = await ProjectModel.addPerson1(data);
      return res;
    }
    console.log('false');
    return false;
  }

  async deleteMerber(data) {
    const res = await ProjectModel.deleteMerber(data);
    return res;
  }
}

module.exports = new ProjectService();
