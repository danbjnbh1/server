const {
  getAllNotes,
  addNote,
  deleteNote,
  updateNote,
} = require('../controllers/notes');

const notesRoutes = (app) => {
  app.get('/notes/:id', getAllNotes);

  app.post('/add/:id', addNote);

  app.delete('/delete/:id', deleteNote);

  app.put('/update/:id', updateNote);
};

module.exports = notesRoutes;
