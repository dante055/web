const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

// ----------------- login and sign in -------------------
router.post('/signup', authController.signUp);
router.post('/login', authController.login);

// ---------------- forget password, reset password -----------
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

// ------------ protect te rputes ------------------
router.use(authController.protect);

// ---------- logout (using the lost logout time) ----------------
router.post('/logout', authController.logOut);

// ---------- logout (overite the http only cookie) ---------------
router.get('/log-out', authController.logout);

// --------------- Get the current user data, Update the Current User (only user) ----------------------
router
  .route('/currentUser')
  .get(userController.getCurrentUserInfo, userController.getUser)
  .patch(
    userController.uploadUserPhoto,
    userController.resizeUserPhoto,
    userController.updateCurrentUser
  )
  .delete(userController.deleteCurrentUser);

// --------------- Update and user (for both user and admin) ----------------------
router.patch('/updateUserPassword', authController.updateUserPassword);

// -------------- Deactivate a account (different from block) (different from block a accout) ---------------------
router.patch('/deactivateAccount', userController.deactivateAccount);

// ---------------- Reactivate a account (both admin and user) -------------------
router.patch('/reactivateAccount', authController.reactivateAccount);

// -------------------  restricted for admin -------------------------
router.use(authController.restrictTo('admin'));

// -------------------  Get all user data -------------------------
router.route('/').get(userController.getALlUsers);

// -------------------  Get a specific user, Update, delete user (only admin) -------------------------
router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updataUser)
  .delete(userController.deleteUser);

/* 
// -------------- upload image here -----------------
const multer = require('multer');
const upload = multer({ dest: '/public/img/users' });
router.patch(upload.single('photo'), userController.updateCurrentUser) 
*/

module.exports = router;
