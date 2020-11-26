const express = require('express');
const {
  checkID,
  checkBody,
  getALlTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
} = require('../controllers/tourController');

const router = express.Router();

// param middleware to check if id exist or not
// app.use() is not use as later router will be wraped in app.use('/route', router)
router.param('id', checkID);

router.route('/').get(getALlTours).post(checkBody, createTour);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

module.exports = router;
