const express = require('express');
const reviewController = require('../controllers/reviewController');
const { protect, restrictTo } = require('../controllers/authController');

const router = express.Router({ mergeParams: true });

// --------------- Get all reviews of the current user ------------------------------
router.use('/myReviews', protect, reviewController.getAllCurrentUserReviews);

// ---------- Create a review on a tour ----
// ---------- Get all reviws in the collection --------
// ---------- Get all revies a  sepcifi our (nested route /tours/:tourId/reviews) ------
router
  .route('/')
  .post(
    protect,
    restrictTo('user'),
    reviewController.setToursAndUserIds,
    reviewController.createReview
  )
  .get(reviewController.getTourReviews);

// ---------------- Get specific review ------------------
// ---------- Update, delete review (user, admin)----------
// user can only delete and update, reviws which he has created
router
  .route('/:id')
  .get(reviewController.getReviewById)
  .patch(protect, restrictTo('user', 'admin'), reviewController.updateReviews)
  .delete(protect, restrictTo('user', 'admin'), reviewController.deleteReviews);

module.exports = router;
