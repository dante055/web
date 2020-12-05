const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// 2. create a schema
// const dataSchema = new Schema({..}, { collection: 'collectionName' });
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a name!'],
      unique: true,
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters']
      // validate: {
      //   validator: validator.isAlpha,
      //   message: 'Tour name must only contain characters',
      // },
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration!'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size!'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty!'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      // min and max also work for dates
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price!'],
    },
    priceDiscount: {
      type: Number,
      // validate : [ function(val) {} , message ]
      validate: {
        validator: function (val) {
          // this only points to current doc on NEW document creation
          return val < this.price;
        },
        // we can accees the values passed in the validor function, insde message fields by using , {VALUE}
        // it is internal to mongoose, not related to other things
        message: 'Discount price ({VALUE}) should be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary!'],
    },
    discription: {
      type: String,
      trim: true,
    },
    imageCover: {
      // only refrence (image name / url / path) is store in the data base,
      // in real life we use some image optimization service to get the imge using this refrence
      type: String,
      required: [true, 'A tour must have a cover image!'],
    },
    images: [String], // array of strings
    createdAt: {
      type: Date,
      default: Date.now(), // mongo will parse the time stam and them it will stored it
      select: false, // to not show the sensitive data
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    collection: 'tours',
    toJSON: { virtuals: true }, // to show the virtual fields
    toObject: { virtuals: true },
  }
);

// add virtual property
// wont be stored in the db, and i calulate fron and existing field
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function (next) {
  // tis represent the current doc
  this.slug = slugify(this.name, { lower: true });
  next();
});

// QUERY MIDDLEWARE
// tourSchema.pre('find', function(next) {
tourSchema.pre(/^find/, function (next) {
  // tis represent the current query
  // add one more query to the existing query
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

// runs after query has finished execution
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds!`);
  next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  // tis represent the current aggegate query
  // unshift() to at the starting of the pipeline in a mutable way
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });

  console.log(this.pipeline());
  next();
});

// 2. create a tour
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
