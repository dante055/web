const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getOverview = catchAsync(async (req, res) => {
  const tours = await Tour.find();
  res.status(200).render('overview', {
    title: 'All tours',
    tours,
  });
});

exports.getTour = catchAsync(async (req, res, next) => {
  const tour = await Tour.findOne({ slug: req.params.slug }).populate({
    path: 'reviews',
    select: 'review user rating',
  });

  if (!tour) {
    return next(new AppError('There is no tour with this name', 404));
  }

  res.status(200).render('tour', {
    title: tour.name,
    tour,
  });
});

exports.getLoginForm = catchAsync(async (req, res) => {
  res.status(200).render('logIn', {
    title: 'Log in your account',
  });
});

exports.getSignUpForm = catchAsync(async (req, res) => {
  res.status(200).render('signUp', {
    title: 'Sign Up',
  });
});

exports.getLogoutConfirmation = catchAsync(async (req, res) => {
  res.status(200).render('logOut', {
    title: 'Log Out',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};

//- WITHOUT API (connect the html form to the route handler)
exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    {
      name: req.body.name,
      email: req.body.email,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser,
  });
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // not implemented
  console.log('reset not implemented yet');
  console.log('reset token : ', req.params.token);

  return next(new AppError('Route not impeleneted yet!', 404));

  // render the reset passwoed page
  // use the api reset passwaor tour in that using axios to reset the password
});

exports.getMyTours = catchAsync(async (req, res) => {
  // Find all user bookings ( extra : do virtul populate on tours to get te data in one query)
  const bookings = await Booking.find({ user: req.user._id });

  // Find tour with return ids
  const tourIDs = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIDs } });

  // reuse the overview template and pass only th e booked tours
  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});
