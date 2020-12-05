const dotenv = require('dotenv');
const mongoose = require('mongoose');

process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: `${__dirname}/../.env` });
const app = require('./app');

const DATABASE = process.env.DATABASE;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;
const PORT = process.env.PORT || 8000;

const DB = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD).replace(
  '<DB_NAME>',
  DATABASE_NAME
);

// 1. connect to db
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(con => {
    console.log('DB connection successfull!! 😝');
  });

// 2. start the server
const server = app.listen(PORT, () => {
  console.log('Listning to the server!!');
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
