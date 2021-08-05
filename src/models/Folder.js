const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  type: String,
  title: String,
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
  },
  userEmail: String,
  folderContent: [mongoose.Schema.Types.Mixed],
});

const Folder = mongoose.model('Folder', folderSchema);

module.exports.folderSchema = folderSchema;
module.exports.Folder = Folder;
