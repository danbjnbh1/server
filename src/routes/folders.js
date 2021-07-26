const {
  addFolder,
  deleteFolder,
  updateFolder,
} = require('../controllers/folders');

const foldersRoutes = (app) => {
  app.post('/:folderId/addFolder', addFolder);

  app.delete('/:folderId/deleteFolder', deleteFolder);

  app.put('/:folderId/updateFolder', updateFolder);
};

module.exports = foldersRoutes;
