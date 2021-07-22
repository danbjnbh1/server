const { User, Folder } = require('../models');

module.exports.addFolder = (req, res) => {
  const userId = req.params.userId;
  const folderId = req.params.folderId;
  const data = req.body;
  console.log(data);
console.log(data.name);
  const newFolder = new Folder({
    type: 'folder',
    title: data.name,
    folderContent: []
  });

  newFolder.save();

  User.findById(userId, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.push(newFolder);
        found.save();
        res.send(found);
      }
    } else res.send(err);
  });
};

module.exports.deleteFolder = (req, res) => {
  const userId = req.params.userId;
  const folderId = req.params.folderId;
  const folderIdToDelete = req.body.folderId;
  User.findById(userId, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.forEach((element, index) => {
          if (element._id == folderIdToDelete) {
            found.folderContent.splice(index, 1);
          }
        });
        found.save();
        res.send(found);
      }
    } else res.send(err);
  });
};

module.exports.updateFolder = (req, res) => {
  const userId = req.params.userId;
  const folderId = req.params.folderId;
  const newName = req.body.newName;
  User.findById(userId, (err, found) => {
    if (!err) {
      if (found) {
        found.folderContent.forEach((element, index) => {
          if (element._id == data.noteId) {
            found.folderContent[index]['name'] = newName;
          }
        });
        console.log(found);
        found.save();
        res.send(found);
      }
    }
  });
};