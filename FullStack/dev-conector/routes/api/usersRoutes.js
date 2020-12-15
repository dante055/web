const express = require('express');
const validatorController = require('../../controllers/validatorController');
const userController = require('../../controllers/userController');
const authController = require('../../controllers/authController');

const router = express.Router();

// @route   GET api/v1/users/me
// @desc    Get the logged in user detatails
// @access  Private
router.get('/me', authController.protect, userController.getUser);

module.exports = router;
