const express = require('express');
const reviewController = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use('/myReviews', protect, reviewController.getAllCurrentUserReviews);

router
  .route('/')
  .post(
    protect,
    restrictTo('user'),
    reviewController.setToursAndUserIds,
    reviewController.createReview
  )
  .get(reviewController.getTourReviews);

router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(protect, restrictTo('user', 'admin'), reviewController.updateReviews)
  .delete(protect, restrictTo('user', 'admin'), reviewController.deleteReviews);

// user can only delete and update, reviws which he has created

module.exports = router;
