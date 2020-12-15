const connectDB = require('./config/db');
const app = require('./app');

const PORT = process.env.PORT || 3000;

// @desc Connect to database
connectDB();

// @desc Create and listen to server
app.listen(PORT, () =>
  console.log(`Server started successfull at port ${PORT}!`)
);
