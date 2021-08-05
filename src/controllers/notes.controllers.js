const mongoose = require('mongoose');
const { Note } = require('../models/Note');
const jwt = require('jsonwebtoken');

module.exports.getAllNotes = (req, res) => {
  const folder = res.folder;
  res.send(folder);
};

module.exports.addNote = (req, res) => {
  const { title, content } = req.body;
  const folder = res.folder;

  const newNote = new Note({
    type: 'note',
    title: title,
    content: content,
  });

  newNote.save();

  folder.folderContent.push(newNote);
  folder.save();
  res.send(folder);
};

module.exports.deleteNote = (req, res) => {
  const noteId = req.body.noteId;
  const folder = res.folder;

  folder.folderContent.forEach((element, index) => {
    if (element._id == noteId) {
      folder.folderContent.splice(index, 1);
    }
  });
  folder.save();
  res.send(folder);
};

module.exports.updateNote = (req, res) => {
  const data = req.body;
  const folder = res.folder;

  folder.folderContent.forEach((element, index) => {
    if (element._id == data.noteId) {
      folder.folderContent[index][data.elementToChange] = data.value;
    }
  });

  folder.markModified('folderContent');
  folder.save();
  res.send(folder);
};
