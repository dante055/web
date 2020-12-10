const mongoose = require('mongoose');
const Tour = require('./tourModel');

const reviewSchema = mongoose.Schema(
  {
    review: {
      type: String,
      trim: true,
      required: [true, 'Review cannot be empty!'],
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: [true, 'A review must have a rating'],
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    tour: {
      type: mongoose.Schema.ObjectId,
      ref: 'Tour',
      required: [true, 'A review must belong to a tour!'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'A review must belong to a user!'],
    },
  },
  {
    collection: 'reviews',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

//  ------- Indexing: to stop user from create  ultiple reviews on the same tour -----------
reviewSchema.index({ tour: 1, user: 1 }, { unique: true });

// --------- Query Middleware : to populate the review -------------------------
reviewSchema.pre(/^find/, function (next) {
  /*
  // we do virtual populate of the reviews in the tours so we dont need to populate tours here
   this.populate({
      path: 'tour',
      select: 'name',
    }) 
  */

  this.populate({
    path: 'user',
    select: 'name photo',
  });

  next();
});

// ----------------- Calculate the average rating ----------------
reviewSchema.statics.calcAverageRatings = async function (tourId) {
  const stats = await this.aggregate([
    {
      $match: { tour: tourId },
    },
    {
      $group: {
        _id: '$tour',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' },
      },
    },
  ]);

  if (stats.length > 0) {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
    });
  } else {
    await Tour.findByIdAndUpdate(tourId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5,
    });
  }
};

// ---- Document middlware (post hook) to call and calulate the new rating after creation ---------
reviewSchema.post('save', function () {
  // this points to current review
  this.constructor.calcAverageRatings(this.tour);
});

// ---- Quwery middlware (post hook) to call and calulate the new rating after updation
// remeber tha behiend the scene findByIdAnd is findOneAnd
reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  if (doc) {
    await doc.constructor.calcAverageRatings(doc.tour);
  }
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;

/* 
// old in new query post middlw ware we have access to the doc itseld
reviewSchema.pre(/^findOneAnd/, async function (next) {
this.r = await this.findOne();
console.log(this.r);
  next();
}); 

reviewSchema.post(/^findOneAnd/, async function (doc, next) {
  // await this.findOne(); does NOT work here, query has already executed
  await this.r.constructor.calcAverageRatings(this.r.tour);
});
*/
