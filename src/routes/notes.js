const {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} = require('../controllers/notes');

const notesRoutes = (app) => {
  app.get('/:id/notes', getAllNotes);

  app.post('/:id/addNote', addNote);

  app.delete('/:id/deleteNote', deleteNote);

  app.put('/:id/updateNote', updateNote);
};

module.exports = notesRoutes;
