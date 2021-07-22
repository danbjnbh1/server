const { User, Folder } = require('../models');

module.exports.addFolder = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  console.log(data);
console.log(data.name);
  const newFolder = new Folder({
    type: 'folder',
    name: data.name,
  });

  newFolder.save();

  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.notes.push(newFolder);
        found.save();
        res.send(found.notes);
      }
    } else res.send(err);
  });
};

module.exports.deleteFolder = (req, res) => {
  const id = req.params.id;
  const folderId = req.body.folderId;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.notes.forEach((element, index) => {
          if (element._id == noteId) {
            found.notes.splice(index, 1);
          }
        });
        found.save();
        res.send(found.notes);
      }
    } else res.send(err);
  });
};

module.exports.updateFolder = (req, res) => {
  const id = req.params.id;
  const newName = req.body.newName;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.notes.forEach((element, index) => {
          if (element._id == data.noteId) {
            found.notes[index]['name'] = newName;
          }
        });
        console.log(found);
        found.save();
        res.send(found.notes);
      }
    }
  });
};