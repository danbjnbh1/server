const {
  addFolder,
  deleteFolder,
  updateFolder,
} = require('../controllers/folders.controllers');
const { getFolder } = require('../middleware/getFolder.middleware');
const { validateCookie } = require('../middleware/validateCookie.middleware');
const express = require('express');
const foldersRouter = express.Router();

foldersRouter.post('/:folderId/addFolder', getFolder, validateCookie, addFolder);

foldersRouter.delete('/:folderId/deleteFolder', getFolder , validateCookie, deleteFolder);

foldersRouter.put('/:folderId/updateFolder', getFolder , validateCookie, updateFolder);


module.exports = foldersRouter;
