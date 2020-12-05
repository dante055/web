const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    // either do this or throw a error here
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// --------- update current user -----------
exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  // 1. create error if user tries to update the password here
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for updating password!!', 400));
  }

  // allowed fields to update
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 2. update the document
  // we cant use save() here as it will throw error that some field (confirmPassword) are not divene
  const newUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: newUser,
    },
  });
});

// ------- delete current user completely --------
exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);

  // write logic to redirect to a newPage and show the msg of successfull deletion

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// -------- dectivate the accounnt -----------
exports.deactivateAccount = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user._id, { active: false });

  // throw error when user tries to login this account

  // write logic to redirect to a newPage and show the msg of successfull deactivation

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getALlUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.updataUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined!',
  });
};
