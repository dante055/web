const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../.env` });
const app = require('./app');

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log('Listning to the server!!');
});
