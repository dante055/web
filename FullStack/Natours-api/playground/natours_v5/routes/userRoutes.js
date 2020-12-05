const express = require('express');
const {
  getALlUsers,
  getUser,
  createUser,
  updataUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getALlUsers).post(createUser);
router.route('/:id').get(getUser).patch(updataUser).delete(deleteUser);

module.exports = router;
