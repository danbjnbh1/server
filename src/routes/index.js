const routes = (app) => {
  const notesRoutes = require('./notes')(app);
  const authenticationRoutes = require('./authentication')(app);
};

module.exports = routes;
