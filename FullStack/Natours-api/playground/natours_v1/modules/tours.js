const fs = require('fs');
const path = require('path');

const getToursData = () => {
  return JSON.parse(
    fs.readFileSync(
      `${path.join(__dirname, '../')}/dev-data/data/tours-simple.json`
    )
  );
};

const findTour = (tours, tourId) => {
  return tours.find(tour => tour.id === tourId);
};

exports.getALlTours = (req, res) => {
  const tours = getToursData();

  // is same a res.json(), 200 is the default code
  res.status(200).json({
    status: 'sucess',
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  // const tourId = req.params.id * 1; // convert into integer
  const tours = getToursData();
  const tour = findTour(tours, Number(req.params.id));

  if (!tour) {
    // return to avoid "ERR_HTTP_HEADERS_SENT" error
    return res.status(404).json({
      status: 'fail',
      msg: 'Invalid Id',
    });
  }
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
  // const newTour = Object.assign( id: newTourId, req.body });

  tours.push(newTour);

  // inside a callback so use asynconous version
  fs.writeFile(
    `${path.join(__dirname, '../')}/dev-data/data/tours-simple.json`,
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
  const tours = getToursData();
  const tourId = Number(req.params.id);
  const tour = findTour(tours, tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      msg: 'Invalid Id',
    });
  }

  const newTour = { ...tour, ...req.body };
  tours[tourId] = newTour;

  fs.writeFile(
    `${path.join(__dirname, '../')}/dev-data/data/tours-simple.json`,
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
  const tours = getToursData();
  const tourId = Number(req.params.id);
  const tour = findTour(tours, tourId);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      msg: 'Invalid Id',
    });
  }

  const newTours = [...tours.slice(0, tourId), ...tours.slice(tourId + 1)];
  fs.writeFile(
    `${path.join(__dirname, '../')}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours, null, 2),
    err => {
      res.status(204).json({
        status: 'success',
        data: null,
      });
    }
  );
};
