module.exports = findFolder = (folder, folderIdToFind) => {
  if (String(folder._id) === folderIdToFind){
    return folder;
  } else folder.forEach(element => {
    
  });
}