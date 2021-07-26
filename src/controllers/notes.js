const { Note, User, Folder } = require('../models');

module.exports.getAllNotes = (req, res) => {
  const folderId = req.params.folderId;

  Folder.findById(folderId, (err, found) => {
    if (!err) {
      if (found) {
        res.send(found);
      }
    } else console.log(err);
  });
};

module.exports.addNote = (req, res) => {
  const folderId = req.params.folderId;
  const data = req.body;

  const newNote = new Note({
    type: 'note',
    title: data.title,
    content: data.content,
  });

  newNote.save();

  Folder.findById(folderId, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.push(newNote);
        found.save();
        res.send(found);
      }
    } else console.log(err);
  });
};

module.exports.deleteNote = (req, res) => {
  const folderId = req.params.folderId;
  const noteId = req.body.noteId;
  Folder.findById(folderId, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.forEach((element, index) => {
          if (element._id == noteId) {
            found.folderContent.splice(index, 1);
          }
        });
        found.save();
        res.send(found);
      }
    } else console.log(err);
  });

  Note.findByIdAndRemove(noteId, (err, found) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.updateNote = (req, res) => {
  const folderId = req.params.folderId;
  const data = req.body;
  Folder.findById(folderId, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.forEach((element, index) => {
          if (element._id == data.noteId) {
            found.folderContent[index][data.elementToChange] = data.value;
          }
        });
        found.markModified('folderContent');
        found.save();
        res.send(found);
      }
    }
  });
};
