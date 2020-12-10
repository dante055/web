const dotenv = require('dotenv');
const mongoose = require('mongoose');

// ------------ Get acces to .evn variables -------
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

// ------- Connect to db --------
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

// -------- Start the server ---------
const server = app.listen(PORT, () => {
  console.log('Listning to the server!!');
});

if (process.env.NODE_ENV === 'production') {
  // Handle uncaught exception anyhere in the app that is not handle by global error handler
  process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! 💥');
    console.log(err.name, err.message);
    process.exit(1);
  });

  // Handle unhandled rejection anyhere in the app that is not handle by global error handler
  process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! 💥 Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
      process.exit(1);
    });
  });
}

process.on('SIGTERM', err => {
  console.log('💥 SIGTERM REJECTION! 💥 Shutting down gracefully...');
  // close the server after handeling pending requests
  server.close(() => {
    console.log('Process Termited 💥 !');
  });
});
