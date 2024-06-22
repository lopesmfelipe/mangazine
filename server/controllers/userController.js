const User = require('../models/userModel');

exports.getAllUsers = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};

// CREATE USER
exports.createUser = async (req, res) => {
  try {
    const { userName, email, userId } = req.body;

    const newUser = await User.create({
      userName,
      email,
      userId,
    });
    res.status(201).json({
      status: 'success',
      data: {
        list: newUser,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
    console.log('Error creating list', err);
  }
};

exports.getUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not yet defined',
  });
};
