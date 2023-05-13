const mongoose = require('mongoose');

// mongodb://localhost:27017/keeperDB
const mongoURL =
  'mongodb+srv://dan:1234@notes.62njofy.mongodb.net/';

const connection = () => {
  mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
  console.log('mongoose connected');
};

module.exports = connection;
