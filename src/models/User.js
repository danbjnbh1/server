const mongoose = require('mongoose');
const { folderSchema } = require('./Folder');

const userSchema = new mongoose.Schema({
  type: String,
  name: String,
  email: String,
  password: String,
  mainFolder: folderSchema,
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;