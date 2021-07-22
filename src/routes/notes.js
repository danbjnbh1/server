const {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} = require('../controllers/notes');

const notesRoutes = (app) => {
  app.get('/:userId/:folderId/notes', getAllNotes);

  app.post('/:userId/:folderId/addNote', addNote);

  app.delete('/:userId/:folderId/deleteNote', deleteNote);

  app.put('/:userId/:folderId/updateNote', updateNote);
};

module.exports = notesRoutes;
