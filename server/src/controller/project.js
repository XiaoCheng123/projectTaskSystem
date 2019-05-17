const projectService = require('../service/project');

class UserController {
  async getInfo(ctx) {
    const user = await projectService.searchUser(ctx.session.user);
    if (user.projectIds !== undefined && user.projectIds !== null) {
      const projectInfo = await projectService.searchProject(user.projectIds);
      ctx.body = {
        status: 200,
        data: projectInfo,
      };
    } else {
      ctx.body = {
        status: 200,
        data: null,
      };
    }
  }

  async addProject(ctx) {
    const user = await projectService.searchUser(ctx.session.user);
    const res = await projectService.addProject(ctx.request.body, user);
    if (res) {
      ctx.body = {
        status: 200,
        data: null,
      };
    } else {
      ctx.body = {
        status: 203,
        data: null,
      };
    }
  }
}

module.exports = new UserController();
