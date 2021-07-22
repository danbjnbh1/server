const { Note, User } = require('../models');

module.exports.getAllNotes = (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        res.send(found.folderContent);
      }
    }
  });
};

module.exports.addNote = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);

  const newNote = new Note({
    type: 'note',
    title: data.title,
    content: data.content,
  });

  newNote.save();

  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.push(newNote);
        found.save();
        res.send(found.folderContent);
      }
    } else res.send(err)
  });
};

module.exports.deleteNote = (req, res) => {
  const id = req.params.id;
  const noteId = req.body.noteId;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.forEach((element, index) => {
          if (element._id == noteId) {
            found.folderContent.splice(index, 1);
          }
        });
        found.save();
        res.send(found.folderContent);
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
        found.folderContent.forEach((element, index) => {
          if (element._id == data.noteId) {
            found.folderContent[index][data.elementToChange] = data.value;
          }
        });
        console.log(found);
        found.save();
        res.send(found.folderContent);
      }
    }
  });
};
