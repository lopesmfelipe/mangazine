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

// CHECK IF A USER EXISTS
exports.checkUserExists = async (req, res) => {
  try {
    const user = await User.findOne({ userId: req.params.id });
    if (user) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

// UPDATE THE THE USER'S READLIST
exports.updateReadlist = async (req, res, next) => {
  console.log(req.body);
  try {
    const { titleId, userId } = req.body;

    const user = await User.findOne({ userId: userId });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!user.readList.includes(titleId)) {
      user.readList.push(titleId);
      await user.save();
    }

    res.status(200).json({
      message: 'Readlist updated successfully',
      readList: user.readList,
    });
  } catch (err) {
    console.error('ERROR', err);
    return res.status(500).json({ status: 'Server error', message: err });
  }
};
