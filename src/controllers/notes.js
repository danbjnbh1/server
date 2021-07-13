const { Note, User } = require('../models');

module.exports.getAllNotes = (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        res.send(found.notes);
      }
    }
  });
};

module.exports.addNote = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const newNote = new Note({
    title: data.title,
    content: data.content,
  });

  newNote.save();
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.notes.push(newNote);
        found.save();
        res.send(found.notes);
      }
    }
  });
};

module.exports.deleteNote = (req, res) => {
  const id = req.params.id;
  const noteId = req.body.noteId;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.notes.forEach((element, index) => {
          if (element._id == noteId) {
            found.notes.splice(index, 1);
          }
        });
        found.save();
        res.send(found.notes);
      }
    }
  });
};

module.exports.updateNote = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.notes.forEach((element, index) => {
          if (element._id == data.noteId) {
            found.notes[index][data.elementToChange] = data.value;
          }
        });
        found.save();
        res.send(found.notes);
      }
    }
  });
};
