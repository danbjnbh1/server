const mongoose = require('mongoose');
const { Folder } = require('../models/Folder');

module.exports.getFolder = async (req, res, next) => {
  const folderId = req.params.folderId;
  try {
    folder = await Folder.findById(folderId);
    if (folder == null) {
      return res.status(404).json({ message: 'folder not found' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.folder = folder;
  next();
};
