const mongoose = require('mongoose');
const { Folder } = require('../models/Folder');

module.exports.addFolder = (req, res) => {
  const data = req.body;
  const folder = res.folder;

  const newFolder = new Folder({
    type: 'folder',
    title: data.name,
    parent: mongoose.Types.ObjectId(folder._id),
    userEmail: folder.userEmail,
    folderContent: [],
  });

  newFolder.save();
  folder.folderContent.push(newFolder);
  folder.save();
  res.send(folder);
};

module.exports.deleteFolder = (req, res) => {
  const folderIdToDelete = req.body.folderId;
  const folder = res.folder;

  folder.folderContent.forEach((element, index) => {
    if (element._id == folderIdToDelete) {
      folder.folderContent.splice(index, 1);
    }
  });
  folder.save();
  res.send(folder);

  Folder.findByIdAndRemove(folderIdToDelete, (err) => {
    if (err) {
      console.log(err.message);
    }
  });
};

module.exports.updateFolder = (req, res) => {
  const newName = req.body.value;
  const folderIdToEdit = req.body.folderIdToEdit;
  const folder = res.folder;

  folder.folderContent.forEach((element, index) => {
    if (String(element._id) === folderIdToEdit) {
      folder.folderContent[index]['title'] = newName;
    }
  });
  Folder.updateOne({_id: folderIdToEdit}, { title: newName }, (err) => {
    if(err) console.log(err.message);
  });
  folder.markModified('folderContent');
  folder.save();
  res.send(folder);
};
