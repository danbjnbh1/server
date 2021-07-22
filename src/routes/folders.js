const {
  addFolder,
  deleteFolder,
  updateFolder,
} = require('../controllers/folders');

const notesRoutes = (app) => {
  app.post('/:id/addFolder', addFolder);

  app.delete('/:id/deleteFolder', deleteFolder);

  app.put('/:id/updateFolder', updateFolder);
};

module.exports = foldersRoutes;