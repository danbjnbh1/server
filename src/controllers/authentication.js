const { User } = require('../models');

module.exports.signUpController = (req, res) => {
  const data = req.body;
  User.findOne({ email: data.email }, (err, found) => {
    if (!err) {
      if (found) {
        res.send(JSON.stringify('this email exist'));
      } else {
        const newUser = new User({
          name: data.name,
          email: data.email,
          password: data.password,
          notes: [],
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
