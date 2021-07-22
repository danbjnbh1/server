const routes = (app) => {
  const notesRoutes = require('./notes')(app);
  const foldersRoutes = require('./folders')(app);
  const authenticationRoutes = require('./authentication')(app);
};

module.exports = routes;
