const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const sendEmail = require('./../utils/email');

// -------- signToken ------------
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ---------- Create jwt token -----------
const createSendToken = async (user, statusCode, res, sendBackUser) => {
  const token = signToken(user._id);

  // http only cookie to store jwt token
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  // as postman works on http and not on https
  // if (process.env.NODE_ENV === 'production') cookieOption.httpOnly = true;
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  sendBackUser
    ? res.status(statusCode).json({
        status: 'success',
        token,
        data: {
          user,
        },
      })
    : res.status(statusCode).json({
        status: 'success',
        token,
      });
};

// --------- SIGN UP ---------
exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res, true);
});

// --------- LOGIN ---------
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1. check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }

  // 2. check if user exist
  const user = await User.findOne({ email }).select('+password +active');
  if (!user.active) {
    return next(
      new AppError(
        'You have deactivated your account. Reactivate it to get access!',
        401
      )
    );
  }
  user.active = undefined;

  // 3. check if password is correct
  if (!user || !(await user.correctPassword(password))) {
    return next(new AppError('Incorrect user or password!', 401));
  }

  // 4. If everything is ok, then send the token to client
  createSendToken(user, 200, res, false);
});

// --------- LOGOUT ---------
exports.logOut = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      lastLoggedOutAt: new Date(),
    },
    {
      runValidators: true,
    }
  );

  res.status(200).json({
    status: 'success',
    message: 'Successfully logged out',
  });
});

// ------ PROTECT ---------
exports.protect = catchAsync(async (req, res, next) => {
  // 1. check if token is pesent in the header or not
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  }

  if (!token) {
    return next(
      new AppError('Your are not logged in! Please login to get access!', 401)
    );
  }

  // 2. Verify the token
  const verify = promisify(jwt.verify);
  const decoded = await verify(token, process.env.JWT_SECRET);

  // 3. check if user still exist
  // const user = await User.findOne({ _id: decoded.id });
  const freshUser = await User.findById(decoded.id).select(
    '+lastPasswordChangedAt +lastLoggedOutAt +active'
  );
  if (!freshUser.active) {
    return next(
      new AppError(
        'You have deactivated your account. Reactivate it to get access!',
        401
      )
    );
  }

  if (!freshUser) {
    return next(
      new AppError('User belonging to this token does not exist anymore!', 401)
    );
  }

  // 4. check if user changed password after the token was issue
  if (
    freshUser.lastPasswordChangedAt &&
    freshUser.havePasswordChanged(decoded.iat)
  ) {
    return next(
      new AppError(
        'User have recently changes password! Please login again!',
        401
      )
    );
  }

  // 5. check if user has logged out after the token was issue
  if (freshUser.lastLoggedOutAt && freshUser.haveUserLoggedOut(decoded.iat)) {
    return next(new AppError('User have logged out! Please login again!', 401));
  }

  // for future need, remember it will have the lastLoggedOutAt, lastPasswordChangedAt property attach to it
  // req.user = freshUser;

  // solution 1 : to remove the lastPasswordChangedAt and lastLoggedOutAt
  /*   req.user = { ...freshUser._doc };
  delete req.user.lastPasswordChangedAt;
  delete req.user.lastLoggedOutAt; */

  // solution 2 :
  freshUser.lastLoggedOutAt = undefined;
  freshUser.lastPasswordChangedAt = undefined;
  freshUser.active = undefined;
  req.user = freshUser;

  next();
});

// ----------- RISTRICT TO -------------
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You dont have permision to perform this action!', 403)
      );
    }
    next();
  };
};

// --------- FORGET PASSWORD ---------
exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1. get the user
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with this email address', 404));
  }

  // 2. Generate the reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3. Send the email to the user
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password?\n Change the password with the link given below.\n ${resetUrl}\n If you didn't forget your password, please ignore this email! `;

  try {
    await sendEmail({
      to: user.email,
      subject: 'Your rest password token (valid for 10 minutes)!',
      message,
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(
      new AppError(
        'There was an error sending the email. Try again Later!',
        500
      )
    );
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully sent the email for passward reset!',
  });
});

// --------- RESET PASSWORD ---------
exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1. get user based on token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2. if token has not expired , and theris is user then change the pass word
  if (!user) {
    return next(new AppError('Token is invalid or has expired!', 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;

  await user.save();

  // 3. update lastPasswordChangedAt
  // we do this behid the sceens in them pre hook

  // 4. login the user, send jwt
  createSendToken(user, 200, res, false);
});

// ----------- update current user password -----------------
exports.updateCurrentUserPassword = catchAsync(async (req, res, next) => {
  // 1. Get the user from the collection
  const user = await User.findById(req.user._id).select('+password');

  // 2. Check if posted current password is correct
  if (!(await user.correctPassword(req.body.currentPassword))) {
    return next(new AppError('Your current password is wrong!', 401));
  }

  if (req.body.currentPassword === req.body.newPassword) {
    return next(
      new AppError("New password can't be equal to the current password!", 400)
    );
  }

  // 3. If password is correct then update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.newPasswordConfirm;
  await user.save();

  // 4. Login user. send JWT
  createSendToken(user, 200, res, false);
});

// ------------ reactivate account ---------------------
exports.reactivateAccount = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email }).select(
    '+password +active'
  );

  if (!user) {
    return next(new AppError('No user with this email is present!', 400));
  }

  if (user.active) {
    return next(new AppError('Your acount is already activated', 400));
  }

  if (!(await user.correctPassword(req.body.password))) {
    return next(new AppError('Your current password is wrong!', 401));
  }

  await User.findByIdAndUpdate(user._id, {
    active: true,
  });

  createSendToken(user, 200, res, false);
});
