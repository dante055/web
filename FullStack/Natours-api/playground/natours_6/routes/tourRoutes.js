const express = require('express');
const {
  getALlTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  aliasTopFive,
  tourStats,
  getMonthlyPlan,
} = require('../controllers/tourController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router();

router.get('/top-5-cheap', protect, aliasTopFive, getALlTours);
router.get('/tour-stats', protect, tourStats);
router.get('/monthly-plan', protect, getMonthlyPlan);

router
  .route('/')
  .get(protect, getALlTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router
  .route('/:id')
  .get(protect, getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
