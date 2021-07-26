const { User, Folder } = require('../models');
const mongoose = require('mongoose');

module.exports.signUpController = (req, res) => {
  const data = req.body;
  User.findOne({ email: data.email }, (err, found) => {
    if (!err) {
      if (found) {
        res.send(JSON.stringify('this email exist'));
      } else {
        const mainFolder = new Folder({
          type: 'folder',
          title: "main",
          folderContent: [],
        });
        mainFolder.save();
        const newUser = new User({
          type: 'user',
          name: data.name,
          email: data.email,
          password: data.password,
          mainFolder: mainFolder,
        });
        newUser.save();
        res.send(JSON.stringify(newUser));
      }
    }
  });
};

module.exports.loginController = (req, res) => {
  const data = req.body;
  User.findOne({ email: data.email, password: data.password }, (err, found) => {
    if (!err) {
      if (found) {
        res.send(found);
      } else {
        res.send(JSON.stringify(false));
      }
    }
  });
};
