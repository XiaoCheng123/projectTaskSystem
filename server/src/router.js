const userController = require('./controller/user');

module.exports = (router) => {
  router.prefix('/api');
  router
    .get('/profile', userController.profile)
    .get('/logout', userController.logout)
    .post('/login', userController.login)
    .post('/register', userController.register);
};
