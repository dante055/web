const express = require('express');
const fs = require('fs');
const {
  getALlTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('./modules/tours');

// creaate a new express app
const app = express();

// middlware so that request can have body, ie req.body
app.use(express.json());

// outside a callback we can use synconous version
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// Get all tours
app.get('/api/v1/tours', getALlTours);

// Get tour with id
app.get('/api/v1/tours/:id', getTour);

// Post a tour
app.post('/api/v1/tours', createTour);

// update a tour
app.patch('/api/v1/tours/:id', updateTour);

// delete a tour
app.delete('/api/v1/tours/:id', deleteTour);

// create and listen to a server
const port = 3000;
app.listen(port, () => {
  console.log('Listning to the server!!');
});
