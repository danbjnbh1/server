const {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} = require('../controllers/notes.controllers');
const { getFolder } = require('../middleware/getFolder.middleware');
const { validateCookie } = require('../middleware/validateCookie.middleware');

const express = require('express');
const notesRouter = express.Router();

notesRouter.get('/:folderId/notes', getFolder, validateCookie, getAllNotes);

notesRouter.post('/:folderId/addNote', getFolder, validateCookie, addNote);

notesRouter.delete(
  '/:folderId/deleteNote',
  getFolder,
  validateCookie,
  deleteNote
);

notesRouter.put('/:folderId/updateNote', getFolder, validateCookie, updateNote);

module.exports = notesRouter;
