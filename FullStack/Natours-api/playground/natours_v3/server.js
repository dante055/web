const dotenv = require('dotenv');
dotenv.config({ path: `${__dirname}/../.env` });
const app = require('./app');

const PORT = process.env.PORT || 8000;

// 2. start the server
app.listen(PORT, () => {
  console.log('Listning to the server!!');
});
