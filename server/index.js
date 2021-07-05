const express = require('express');
const mongoose = require('mongoose');

// mongodb://localhost:27017/keeperDB
const mongoURL = 'mongodb+srv://dan:1234@cluster0.sivcn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(mongoURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

if (process.env.NODE_ENV === 'production') {
  // Exprees will serve up production assets
  app.use(express.static('client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

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

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  notes: [noteSchema],
});

const Note = mongoose.model('Note', noteSchema);

const User = mongoose.model('User', userSchema);

app.post('/add/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  const newNote = new Note({
    title: data.title,
    content: data.content,
  });

  newNote.save();
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.notes.push(newNote);
        found.save();
        res.send(found.notes);
      }
    }
  });
});

app.get('/notes/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        res.send(found.notes);
      }
    }
  });
});

app.delete('/delete/:id', (req, res) => {
  const id = req.params.id;
  const noteId = req.body.noteId;
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
    }
  });
});

app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const data = req.body;
  User.findById(id, (err, found) => {
    if (!err) {
      if (found) {
        found.notes.forEach((element, index) => {
          if (element._id == data.noteId) {
            found.notes[index][data.elementToChange] = data.value;
          }
        });
        found.save();
        res.send(found.notes);
      }
    }
  });
});

app.post('/signUp', (req, res) => {
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
});

app.post('/login', (req, res) => {
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
});

let port = process.env.PORT;
if (port == null || port === '') {
  port = 3001;
}

app.listen(port, () => {
  console.log('server is running on port 3001');
  console.log('http://localhost:3001/');
});
