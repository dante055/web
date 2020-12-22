const { promisify } = require('util');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('./../models/userModel');
const AppError = require('./../utils/appError');
const catchAsync = require('./../utils/catchAsync');
const Email = require('./../utils/email');

// -------- signToken ------------
const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// ---------- Create jwt token -----------
const createSendToken = async (user, statusCode, req, res, sendBackUser) => {
  const token = signToken(user._id);

  // http only cookie to store jwt token
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
  };
  // if request is secoure
  // if (req.secure || req.headers['x-forwarded-proto'] === 'https')
  //   cookieOptions.secure = true;
  // if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

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
  const body = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  };
  const newUser = await User.create(body);

  const url = `${req.protocol}://${req.get('host')}/login`;
  await new Email(newUser, url).sendWelcome();

  createSendToken(newUser, 201, req, res);
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
  createSendToken(user, 200, req, res, false);
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

// -------- overwriting the cookie ------------
exports.logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000), // 10 sec expiration
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protectLogOutRoute = catchAsync(async (req, res, next) => {
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  } else {
    token = null;
  }

  if (token === 'loggedout' || token === null) {
    return next();
  }

  next(new AppError('Your are logged in! Please logout to get access!', 401));
});

// ------ PROTECT ---------
exports.protect = catchAsync(async (req, res, next) => {
  // 1. check if token is pesent in the header or not
  const { authorization } = req.headers;
  let token;
  if (authorization && authorization.startsWith('Bearer')) {
    token = authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
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
  const currentUser = await User.findById(decoded.id).select(
    '+lastPasswordChangedAt +lastLoggedOutAt +active'
  );

  if (!currentUser) {
    return next(
      new AppError('User belonging to this token does not exist anymore!', 401)
    );
  }

  if (!currentUser.active) {
    return next(
      new AppError(
        'You have deactivated your account. Reactivate it to get access!',
        401
      )
    );
  }

  // 4. check if user changed password after the token was issue
  if (
    currentUser.lastPasswordChangedAt &&
    currentUser.havePasswordChanged(decoded.iat)
  ) {
    return next(
      new AppError(
        'User have recently changes password! Please login again!',
        401
      )
    );
  }

  // 5. check if user has logged out after the token was issue
  if (
    currentUser.lastLoggedOutAt &&
    currentUser.haveUserLoggedOut(decoded.iat)
  ) {
    return next(new AppError('User have logged out! Please login again!', 401));
  }

  currentUser.lastLoggedOutAt = undefined;
  currentUser.lastPasswordChangedAt = undefined;
  currentUser.active = undefined;
  req.user = currentUser;
  res.locals.user = currentUser;

  next();
});

// ------ is user logged in ---------
exports.isLoggedIn = async (req, res, next) => {
  // 1. check if token is pesent in the header or not
  if (req.cookies.jwt) {
    try {
      const token = req.cookies.jwt;

      if (!token) {
        return next();
      }

      // 2. Verify the token
      const verify = promisify(jwt.verify);
      const decoded = await verify(token, process.env.JWT_SECRET);

      // 3. check if user still exist
      const currentUser = await User.findById(decoded.id).select(
        '+lastPasswordChangedAt +lastLoggedOutAt +active'
      );

      if (!currentUser) {
        return next();
      }

      if (!currentUser.active) {
        return next();
      }

      // 4. check if user changed password after the token was issue
      if (
        currentUser.lastPasswordChangedAt &&
        currentUser.havePasswordChanged(decoded.iat)
      ) {
        return next();
      }

      // 5. check if user has logged out after the token was issue
      if (
        currentUser.lastLoggedOutAt &&
        currentUser.haveUserLoggedOut(decoded.iat)
      ) {
        return next();
      }

      currentUser.lastLoggedOutAt = undefined;
      currentUser.lastPasswordChangedAt = undefined;
      currentUser.active = undefined;
      res.locals.user = currentUser;

      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};
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
  // from the website
  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/resetPassword/${resetToken}`;

  // Api route
  /*  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`; */

  try {
    await new Email(user, resetUrl).sendResetPassword();
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
  createSendToken(user, 200, req, res, false);
});

// ----------- update user password (for currnet user and admin) -----------------
exports.updateUserPassword = catchAsync(async (req, res, next) => {
  const isAdmin = req.user.role.includes('admin');
  const userFilter = isAdmin ? req.body.email : req.user._id;
  // 1. Get the user from the collection
  let query = isAdmin
    ? User.findOne({ email: userFilter })
    : User.findById(userFilter);
  const user = await query.select('+password');

  if (!user) {
    return next(new AppError('No user with this email is present!', 400));
  }

  // if the user is admin then he cant update the his own passward in this way
  if (!isAdmin || (isAdmin && userFilter === req.user.email)) {
    // 2. Check if posted current password is correct
    if (!(await user.correctPassword(req.body.currentPassword))) {
      return next(new AppError('Your current password is wrong!', 401));
    }
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

  if (!isAdmin || (isAdmin && userFilter === req.user.email)) {
    // 4. Login user. send JWT
    return createSendToken(user, 200, req, res, false);
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully updated the password of the user!',
  });
});

// ------------ reactivate account (for user and admin) ---------------------
exports.reactivateAccount = catchAsync(async (req, res, next) => {
  const isNotAdmin = !req.user.role.includes('admin');

  const user = await User.findOne({ email: req.body.email }).select(
    '+password +active'
  );

  if (!user) {
    return next(new AppError('No user with this email is present!', 400));
  }

  if (user.active) {
    return next(new AppError('This acount is already activated', 400));
  }

  if (isNotAdmin && !(await user.correctPassword(req.body.password))) {
    return next(new AppError('Your current password is wrong!', 401));
  }

  await User.findByIdAndUpdate(user._id, {
    active: true,
  });

  if (isNotAdmin) {
    return createSendToken(user, 200, res, false);
  }

  res.status(200).json({
    status: 'success',
    message: 'Successfully reactivated the user account!',
  });
});
