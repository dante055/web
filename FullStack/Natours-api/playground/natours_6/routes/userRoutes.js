const express = require('express');
const {
  updateCurrentUser,
  deleteCurrentUser,
  deactivateAccount,
} = require('../controllers/userController');
const {
  signUp,
  login,
  logOut,
  protect,
  forgotPassword,
  resetPassword,
  updateCurrentUserPassword,
  reactivateAccount,
} = require('../controllers/authController');

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', login);
router.post('/logout', protect, logOut);

router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

router.patch('/updateCurrentUserPassword', protect, updateCurrentUserPassword);
router.patch('/updateCurrentUser', protect, updateCurrentUser);
router.patch('/deleteCurrentUser', protect, deleteCurrentUser);
router.patch('/deactivateAccount', protect, deactivateAccount);
router.patch('/reactivateAccount', reactivateAccount);

// for admin
// router.route('/').get(getALlUsers).post(createUser);
// router.route('/:id').get(getUser).patch(updataUser).delete(deleteUser);

module.exports = router;
