const {
  signUpController,
  loginController,
} = require('../controllers/authentication');

const authenticationRoutes = (app) => {
  app.post('/signUp', signUpController);

  app.post('/login', loginController);
};

module.exports = authenticationRoutes;
