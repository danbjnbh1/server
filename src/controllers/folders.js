const mongoose = require('mongoose');
const { User, Folder } = require('../models');

module.exports.addFolder = (req, res) => {
  const folderId = req.params.folderId;
  const data = req.body;

  Folder.findById(folderId, (err, found) => {
    if (!err) {
      if (found) {
        const newFolder = new Folder({
          type: 'folder',
          title: data.name,
          parent: mongoose.Types.ObjectId(folderId),
          path: found.path + '/' + data.name,
          folderContent: [],
        });

        newFolder.save();
        found.folderContent.push(newFolder);
        found.save();
        res.send(found);
      }
    } else console.log(err);
  });
};

module.exports.deleteFolder = (req, res) => {
  const folderId = req.params.folderId;
  const folderIdToDelete = req.body.folderId;

  Folder.findById(folderId, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.forEach((element, index) => {
          if (element._id == folderIdToDelete) {
            found.folderContent.splice(index, 1);
          }
        });
        found.save();
        res.send(found);
      } else console.log(err);
    }
  });

  Folder.findByIdAndRemove(folderIdToDelete, (err, found) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports.updateFolder = (req, res) => {
  const folderId = req.params.folderId;
  const newName = req.body.value;
  const folderIdToEdit = req.body.folderIdToEdit;
  Folder.findById(folderId, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.forEach((element, index) => {
          if (element._id == folderIdToEdit) {
            found.folderContent[index]['title'] = newName;
          }
        });
        found.markModified('folderContent');
        found.save();
        res.send(found);
      }
    }
  });
  Folder.findByIdAndUpdate(folderIdToEdit, { title: newName }, (err) => {
    if (err) {
      console.log(err);
    }
  });
};
