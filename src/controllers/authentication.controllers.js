const mongoose = require('mongoose');
const { Folder } = require('../models/Folder');
const { User } = require('../models/User');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports.signUpController = async (req, res) => {
  const { email, name, password } = req.body;
  const user = res.user;
  if (user) return res.send('this email exist');

  const mainFolder = new Folder({
    type: 'folder',
    title: 'main',
    userEmail: email,
    folderContent: [],
  });

  mainFolder.save();

  const saltRounds = 10;
  hash = await bcrypt.hash(password, saltRounds);
  const newUser = new User({
    type: 'user',
    name: name,
    email: email,
    password: hash,
    mainFolder: mainFolder,
  });

  newUser.save();
  const token = jwt.sign(
    { email, name, mainFolderId: mainFolder._id },
    'privateKey'
  );

  res.cookie('token', token, { httpOnly: true, secure: true });
  console.log(newUser);
  res.send(newUser);
};

module.exports.loginController = (req, res) => {
  const { email, password } = req.body;
  const user = res.user;

  if (!user) {
    return res.send(false);
  }

  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.send(false);
  }

  const token = jwt.sign(
    { email, mainFolderId: user.mainFolder._id, name: user.name },
    'privateKey'
  );
  res.cookie('token', token, { httpOnly: true, secure: true });
  return res.send(user);
};

module.exports.tokenCheckController = (req, res) => {
  token = req.cookies.token;
  if (token) {
    const { mainFolderId, name } = jwt.verify(token, 'privateKey');
    res.send({ mainFolderId, name });
  } else res.send(false);
};

module.exports.clearCookieController = (req, res) => {
  res.clearCookie('token');
  res.send();
};
