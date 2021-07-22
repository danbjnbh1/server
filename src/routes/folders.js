const {
  addFolder,
  deleteFolder,
  updateFolder,
} = require('../controllers/folders');

const foldersRoutes = (app) => {
  app.post('/:userId/:folderId/addFolder', addFolder);

  app.delete('/:userId/:folderId/deleteFolder', deleteFolder);

  app.put('/:userId/:folderId/updateFolder', updateFolder);
};

module.exports = foldersRoutes;