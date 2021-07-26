const {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} = require('../controllers/notes');

const notesRoutes = (app) => {
  app.get('/:folderId/notes', getAllNotes);

  app.post('/:folderId/addNote', addNote);

  app.delete('/:folderId/deleteNote', deleteNote);

  app.put('/:folderId/updateNote', updateNote);
};

module.exports = notesRoutes;
