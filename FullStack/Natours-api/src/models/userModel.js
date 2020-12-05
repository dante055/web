const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const e = require('express');

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name!'],
    },
    email: {
      type: String,
      required: [true, 'Please provide a Email!'],
      unique: true,
      lowercase: true, // conver to lower case
      validate: [validator.isEmail, 'Please provide a valid email!'],
    },
    photo: String,
    role: {
      type: String,
      enum: ['admin', 'user', 'guide', 'lead-guide'],
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please provide a password!'],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password!'],
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Confirm password don't match",
      },
    },
    lastPasswordChangedAt: {
      type: Date,
      select: false,
    },
    passwordResetToken: {
      type: String,
      select: false,
    },
    passwordResetExpires: {
      type: String,
      select: false,
    },
    lastLoggedOutAt: {
      type: Date,
      select: false,
    },
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  {
    collection: 'users',
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

// Document middleware (Pre hook) : For encrypting the password
// remeber to switch the hashing of password when u run the import scripts
userSchema.pre('save', async function (next) {
  // return if password is not modified
  if (!this.isModified('password')) return next();

  // hash the pass word with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  // delete the password confirmed field
  this.passwordConfirm = undefined;

  if (!this.isNew) {
    // we substract 1 sec so tht the jwt token is not crest befor the password updation
    this.lastPasswordChangedAt = Date.now() - 1000;
  }

  next();
});

// Query middleware (Pre hook) : To send only active accounts
userSchema.post(/^find/, async function (docs, next) {
  this.find({ active: { $ne: false } });
  next();
});

//  Instance method : are applied on the doc

// 1. Instance method : to compare the login password with password stored in db
userSchema.methods.correctPassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// 1. Instance method : check if user have changed password (Expire the token if password habe been changed)
userSchema.methods.havePasswordChanged = function (JWTtimeStamp) {
  const lastPasswordChangedAt = this.lastPasswordChangedAt.getTime() / 1000;
  return lastPasswordChangedAt > JWTtimeStamp;
};

// Instance method :  check if user have logged out (Expire the token if he has logged out)
userSchema.methods.haveUserLoggedOut = function (JWTtimeStamp) {
  const lastLoggedOutAt = this.lastLoggedOutAt.getTime() / 1000;
  return lastLoggedOutAt > JWTtimeStamp;
};

// Instance method : To create the reset password token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  // It wont update the documnet, but will only change the object representing the doc
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Expire time : 10 minutes
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  // We store the encryped version in the db and send the unencrypted version
  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
