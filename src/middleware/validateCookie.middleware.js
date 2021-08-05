const jwt = require('jsonwebtoken');

module.exports.validateCookie = async (req, res, next) => {
  try {
    decoded = await jwt.verify(req.cookies.token, 'privateKey');
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  if (decoded.email === res.folder.userEmail) {
    next();
  } else return res.json({ message: 'Cookie not validated' });
};
