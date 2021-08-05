const app = require('../config/server');
const rootRouter = require('./routes');
require('../config/database')();

app.use(rootRouter);

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('server is running on port 3001');
  console.log('https://keeperplus.herokuapp.com/');
});
