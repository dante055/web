const express = require('express');
const {
  getALlTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopFive,
  tourStats,
  getMonthlyPlan
} = require('../controllers/tourController');

const router = express.Router();

router.route('/').get(getALlTours).post(createTour);
router.route('/top-5-cheap').get(aliasTopFive, getALlTours);
router.route('/tour-stats').get(tourStats);
router.route('/monthly-plan').get(getMonthlyPlan);
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

/* 
  Note : 
    When you're trying to send request to "api/v1/tours/tour-stats" 
    you actually sending request to "api/v1/tours/:id" and "tour-stats" goes as id to this route 
    causing an error. So be sure that your "tour-stats" route defined before your id route.
*/

module.exports = router;
