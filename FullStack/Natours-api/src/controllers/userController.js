const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const factory = require('./handleFactory');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    // either do this or throw a error here
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

// -------- get current user info ---------
exports.getCurrentUserInfo = (req, res, next) => {
  req.params.id = req.user._id;
  next();
};

// --------- update current user -----------
// allow admin to add roles, (should admin be allowd to remove his admin role ??)
exports.updateCurrentUser = catchAsync(async (req, res, next) => {
  // 1. create error if user tries to update the password here
  if (req.body.password || req.body.passwordConfirm) {
    return next(new AppError('This route is not for updating password!!', 400));
  }

  // allowed fields to update
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 2. update the document
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

// ------- delete current user completely  --------
exports.deleteCurrentUser = catchAsync(async (req, res, next) => {
  const isAdmin = req.user.role.includes('admin');

  if (isAdmin) {
    return next(new AppError("Admin can't delete his own acount!", 401));
  }

  await User.findByIdAndDelete(req.user._id);

  // write logic to redirect to a newPage and show the msg of successfull deletion

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

// -------- dectivate the accounnt (user and admin) -----------
exports.deactivateAccount = catchAsync(async (req, res, next) => {
  const isAdmin = req.user.role.includes('admin');
  const userFilter = isAdmin ? req.body.email : req.user._id;

  if (isAdmin && userFilter === req.user.email) {
    return next(new AppError("Admin can't deactivate his own acount!", 401));
  }

  let query = isAdmin
    ? User.findOneAndUpdate({ email: userFilter }, { active: false })
    : User.findByIdAndUpdate(userFilter, { active: false });
  const user = await query;

  if (!user) {
    return next(new AppError('No user with this email is present!', 400));
  }

  // write logic to redirect to a newPage and show the msg of successfull deactivation
  // throw error when user tries to login this account

  res.status(200).json({
    status: 'success',
    message: 'sucessfully deactivated the account!',
  });
});

// only admin
exports.getALlUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
exports.updataUser = factory.updateOne(User); // Dont update the password with this
exports.deleteUser = factory.deleteOne(User);
