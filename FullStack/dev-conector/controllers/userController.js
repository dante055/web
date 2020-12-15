const User = require('../models/User');

exports.getUser = async (req, res) => {
  try {
    // const user = await User.findById(req.user);
    res.json({ status: 'success', user: req.user });
  } catch (err) {
    console.log(err);
    let statusCode = 500;
    let message = `Something went wrong! Please try again later!`;
    res.status(statusCode).json({ status: 'fail', errors: [{ msg: message }] });
  }
};
