const {
  signUpController,
  loginController,
  tokenCheckController,
  clearCookieController,
} = require('../controllers/authentication.controllers');
const { getUser } = require('../middleware/getUser.middleware');

const authenticationRouter = require('express').Router();

authenticationRouter.post('/signUp', getUser, signUpController);
authenticationRouter.post('/login', getUser, loginController);
authenticationRouter.post('/tokenCheck', tokenCheckController);
authenticationRouter.post('/clearCookie', clearCookieController);

module.exports = authenticationRouter;
