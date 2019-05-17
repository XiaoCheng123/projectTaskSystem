const userController = require('./controller/user');
const projectController = require('./controller/project');

module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/profile', userController.profile)
    .get('/logout', userController.logout)
    .get('/projectInfo', projectController.getInfo)
    .post('/login', userController.login)
    .post('/register', userController.register)
    .post('/addProject', projectController.addProject);
};
