const Review = require('./../models/reviewModel');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');

exports.setToursAndUserIds = (req, res, next) => {
  // nested routes implementation
  if (!req.body.tour) req.body.tour = req.params.tourId;
  req.body.user = req.user._id;
  next();
};

exports.getAllCurrentUserReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find({ user: req.user._id });

  res.status(200).json({
    status: 'sucess',
    result: reviews.length,
    data: {
      reviews,
    },
  });
});

// works for both : get all reviews of all tours and to get revies of a specifc tour
exports.getTourReviews = factory.getAll(Review);

exports.getReviewById = factory.getOne(Review);

exports.createReview = factory.createOne(Review);

exports.updateReviews = factory.updateOne(Review);

exports.deleteReviews = factory.deleteOne(Review);
