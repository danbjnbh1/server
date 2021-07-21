const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  type: String,
  title: String,
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

module.exports.Note = Note;
module.exports.noteSchema = noteSchema;
