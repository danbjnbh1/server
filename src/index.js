const app = require('../config/server');
const mongoose = require('../config/database')();
const routes = require('./routes')(app);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('server is running on port 3001');
  console.log('https://keeperplus.herokuapp.com/');
});
