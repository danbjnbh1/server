const mongoose = require('mongoose');
const { noteSchema } = require('./Note');

const folderSchema = new mongoose.Schema();
folderSchema.add({
  type: String,
  title: String,
  folderContent: [noteSchema],
})

const Folder = mongoose.model('Folder', folderSchema);

module.exports.folderSchema = folderSchema;
module.exports.Folder = Folder;