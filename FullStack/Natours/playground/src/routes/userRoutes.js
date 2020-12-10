const express = require('express');
// const multer = require('multer');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// const upload = multer({ dest: '/public/img/users' });

const router = express.Router();

router.post('/signup', authController.signUp);
router.post('/login', authController.login);

router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// for both user and admin
router.patch('/reactivateAccount', authController.reactivateAccount);

// for current user only
router.use(authController.protect);

// using the lost logout time
router.post('/logout', authController.logOut);

// overite the http only cookie
router.get('/log-out', authController.logout);

router
  .route('/currentUser')
  .get(userController.getCurrentUserInfo, userController.getUser)
  // .patch(upload.single('photo'), userController.updateCurrentUser)
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateCurrentUser
  )
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
