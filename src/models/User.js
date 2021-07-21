const mongoose = require('mongoose');
const { noteSchema } = require('./Note');

const userSchema = new mongoose.Schema({
  type: String,
  name: String,
  email: String,
  password: String,
  notes: [noteSchema],
});

const User = mongoose.model('User', userSchema);

module.exports.User = User;