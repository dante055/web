const fs = require('fs');

const getToursData = () => {
  return JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
  );
};

// middleware to check if id exist or not
exports.checkID = (req, res, next, val) => {
  console.log(`Tour id is: ${val}`);
  const tours = getToursData();
  const tour = tours.find(tour => tour.id === Number(val));

  // dont know if it is safe or id best practice to use it like this
  // i am uing this so that i dont have to call getToursData() two time, one here and one the handeler
  req.tours = tours;

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  next();
};

exports.checkBody = (req, res, next) => {
  console.log('in');
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

exports.getALlTours = (req, res) => {
  const tours = getToursData();
  res.status(200).json({
    status: 'sucess',
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // const tours = getToursData();
  const tours = req.tours;
  const tourId = Number(req.params.id);
  const tour = tours.find(tour => tour.id === tourId);

  res.status(200).json({
    status: 'sucess',
    data: {
      tour,
    },
  });
};

exports.createTour = (req, res) => {
  const tours = getToursData();
  const newTourId = tours[tours.length - 1].id + 1;
  const newTour = { id: newTourId, ...req.body };

  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.updateTour = (req, res) => {
  // const tours = getToursData();
  const tours = req.tours;
  const tourId = Number(req.params.id);
  const tourIndex = tours.findIndex(tour => tour.id === tourId);

  const newTour = { ...tours[tourIndex], ...req.body };
  tours[tourIndex] = newTour;

  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(tours, null, 2),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

exports.deleteTour = (req, res) => {
  // const tours = getToursData();
  const tours = req.tours;
  const tourId = Number(req.params.id);
  const tourIndex = tours.findIndex(tour => tour.id === tourId);

  const newTours = [
    ...tours.slice(0, tourIndex),
    ...tours.slice(tourIndex + 1),
  ];
  fs.writeFile(
    `${__dirname}/../dev-data/data/tours-simple.json`,
    JSON.stringify(newTours, null, 2),
    err => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
