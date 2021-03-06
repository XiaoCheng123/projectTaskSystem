const userController = require('./controller/user');
const projectController = require('./controller/project');

module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/profile', userController.profile)
    .get('/logout', userController.logout)
    .get('/projectInfo', projectController.getInfo)
    .get('/getMerber', projectController.getMerber)
    .get('/getUser', userController.getUser)
    .get('/getNotice', projectController.getNotice)
    .get('/updateTask', projectController.updateTask)
    .post('/login', userController.login)
    .post('/register', userController.register)
    .post('/addProject', projectController.addProject)
    .post('/addPerson', projectController.addPerson)
    .post('/deleteMerber', projectController.deleteMerber)
    .post('/addTask', projectController.addTask)
    .post('/updateUser', userController.updateUser);
};
