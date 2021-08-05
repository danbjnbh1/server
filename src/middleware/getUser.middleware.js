const mongoose = require('mongoose');
const { User } = require('../models/User');

module.exports.getUser = async (req, res, next) => {
  const email = req.body.email;
  try {
    user = await User.findOne({ email: email });
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
