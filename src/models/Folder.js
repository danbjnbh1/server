const mongoose = require('mongoose');
const { noteSchema } = require('./Note');

const folderSchema = new mongoose.Schema();
folderSchema.add({
  type: String,
  name: String,
  folderContent: [folderSchema, noteSchema],
})

const Folder = mongoose.model('Folder', folderSchema);

module.exports.Folder = Folder;