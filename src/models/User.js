const mongoose = require('mongoose');
const { folderSchema } = require('./Folder');

const userSchema = new mongoose.Schema({
  type: String,
  name: String,
  email: String,
  password: String,
  mainFolder: folderSchema,
  // folderContent: [mongoose.Schema.Types.Mixed],
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;