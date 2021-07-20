const mongoose = require('mongoose');
const noteSchema = require('./Note');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  notes: [noteSchema],
});

const User = mongoose.model('User', userSchema);

module.exports = User;