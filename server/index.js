const express = require('express');
const mongoose = require('mongoose');

const mongoURL = 'mongodb://localhost:27017/keeperDB';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

const noteSchema = new mongoose.Schema({
  title: String,
  content: String,
});

const Note = mongoose.model('Note', noteSchema);

app.post('/add', (req, res) => {
  const data = req.body;
  const newNote = new Note({
    title: data.title,
    content: data.content,
  });

  newNote.save();
  res.send('note added');
});

app.get('/notes', (req, res) => {
  Note.find({}, (err, found) => {
    if (err) {
      console.log(err);
    } else {
      const notes = found;
      res.send(notes);
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  Note.findByIdAndRemove(id, (err) => {
    if (err) {
      console.log(err);
    } else {
      res.send({ removed: id });
    }
  });
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  Note.updateOne(
    { _id: id },
    { [data.elementToChange]: data.value },
    (err, found) => {
      if (err) {
        console.log(err);
      } else if (found) {
        res.send({ update: id });
      }
    }
  );
});

app.listen(3001, () => {
  console.log('server is running on port 3001');
  console.log('http://localhost:3001/');
});
