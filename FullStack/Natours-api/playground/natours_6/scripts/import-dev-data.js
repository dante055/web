const fs = require('fs');
const util = require('util');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Tour = require('../models/tourModel');

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
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(path, 'utf8', (err, data) => {
  //       if (err) {
  //         reject(err);
  //       }
  //       resolve(JSON.parse(data));
  //     });
  //   });

  const readFile = util.promisify(fs.readFile);
  const data = await readFile(path);
  return JSON.parse(data);
};

const importAllData = async () => {
  try {
    const tours = await readFileData(
      `${__dirname}/../dev-data/data/tours-simple.json`
    );
    await Tour.create(tours);
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
