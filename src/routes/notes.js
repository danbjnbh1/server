const {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} = require('../controllers/notes');

const notesRoutes = (app) => {
  app.get('/:userId/notes', getAllNotes);

  app.post('/:userId/addNote', addNote);

  app.delete('/:userId/deleteNote', deleteNote);

  app.put('/:userId/updateNote', updateNote);
};

module.exports = notesRoutes;
