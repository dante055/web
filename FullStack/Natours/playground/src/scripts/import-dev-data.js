const fs = require('fs');
const util = require('util');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Review = require('../models/reviewModel');

dotenv.config({ path: `${__dirname}/../../.env` });

const DATABASE = process.env.DATABASE;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_NAME = process.env.DATABASE_NAME;

const DB = DATABASE.replace('<PASSWORD>', DATABASE_PASSWORD).replace(
  '<DB_NAME>',
  DATABASE_NAME
);

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

const readFileData = async path => {
  const readFile = util.promisify(fs.readFile);
  const data = await readFile(path);
  return JSON.parse(data);
};

// password for alll the users is test1234
const importAllData = async () => {
  try {
    const tours = await readFileData(
      `${__dirname}/../dev-data/data/tours_withCreatedByAndStartLocation.json`
    );
    const users = await readFileData(
      `${__dirname}/../dev-data/data/users.json`
    );
    const reviews = await readFileData(
      `${__dirname}/../dev-data/data/reviews.json`
    );
    await Tour.create(tours);
    // comment out the password encryption step
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log('Data sucessfully imported!!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

const deleteAllData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();
    console.log('Data sucessfully deleted!!');
    process.exit();
  } catch (err) {
    console.log(err);
    process.exit();
  }
};

if (process.argv[2] === '--import') {
  importAllData();
} else if (process.argv[2] === '--delete') {
  deleteAllData();
}
