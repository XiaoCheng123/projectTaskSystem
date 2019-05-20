const projectService = require('../service/project');
const userService = require('../service/user');

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

  async getMerber(ctx) {
    const users = await userService.getUser();
    const merber = users.filter((user) => {
      if (user.projectIds !== null && user.projectIds.split(',').includes(ctx.request.query.id)) {
        return true;
      }
      return false;
    });
    if (ctx.request.query.id !== '-1') {
      const userData = await userService.profile(ctx.session.user);
      const projectData = await projectService.getProject(ctx.request.query.id);
      if (userData.data[0].id === projectData[0].ownerId) {
        merber.isOwner = false;
      } else {
        merber.isOwner = true;
      }
    } else {
      merber.isOwner = true;
    }
    if (merber !== undefined && merber !== null) {
      ctx.body = {
        status: 200,
        data: merber,
      };
    } else {
      ctx.body = {
        status: 203,
        data: [],
      };
    }
  }

  async getTask(ctx) {
    const data = ctx.request.query;

    if (data.id === '-1') {
      ctx.body = {
        status: 203,
        data: [],
      };
    } else {
      const res = await projectService.getTask(data.id);
      ctx.body = {
        status: 200,
        data: res,
      };
    }
  }

  async addPerson(ctx) {
    const data = ctx.request.body;

    console.log(data);
    if (data.projectValue === '-1') {
      ctx.body = {
        status: 400,
      };
    } else if (data.selectUser === undefined) {
      ctx.body = {
        status: 401,
      };
    } else {
      const res = await projectService.addPerson(data);
      if (res) {
        ctx.body = {
          status: 200,
        };
      } else {
        ctx.body = {
          status: 203,
        };
      }
    }
  }

  async deleteMerber(ctx) {
    const data = ctx.request.body;

    console.log(data);
    const res = await projectService.deleteMerber(data);

    if (res) {
      ctx.body = {
        status: 200,
      };
    } else {
      ctx.body = {
        status: 203,
      };
    }
  }

  async updateTask(ctx) {
    const taskId = ctx.request.query.id;
    const res = await projectService.updateTask(taskId);
    if (res) {
      ctx.body = {
        status: 200,
      };
    } else {
      ctx.body = {
        status: 203,
      };
    }
  }

  async addTask(ctx) {
    const res = await projectService.addTask(ctx.request.body);
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
