const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// for both user and admin
router.patch('/reactivateAccount', authController.reactivateAccount);

// for current user only
router.use(authController.protect);
router.post('/logout', authController.logOut);
router
  .route('/currentUser')
  .get(userController.getCurrentUserInfo, userController.getUser)
  .patch(userController.updateCurrentUser)
  .delete(userController.deleteCurrentUser);

// for both user and admin
router.patch('/updateUserPassword', authController.updateUserPassword);
router.patch('/deactivateAccount', userController.deactivateAccount);

// for admin
router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getALlUsers);
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updataUser)
  .delete(userController.deleteUser);

module.exports = router;
