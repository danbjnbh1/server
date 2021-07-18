const {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} = require('../controllers/notes');

const notesRoutes = (app) => {
  app.get('/:id/notes', getAllNotes);

  app.post('/:id/add/', addNote);

  app.delete('/:id/delete/', deleteNote);

  app.put('/"id/update/', updateNote);
};

module.exports = notesRoutes;
