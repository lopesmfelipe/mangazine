const User = require('../models/userModel');
const List = require('../models/listModel');

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
  try {
    const { titleId } = req.body;
    const { id } = req.params.id;

    const user = await User.findOne({ userId: id });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const readList = await List.findById(user.readList);

    if (!readList) {
      return res.status(404).json({ message: 'Readlist not found' });
    }

    if (!readList.titles.include(titleId)) {
      readList.titles.push(titleId);
      await readList.save();
    }

    res
      .status(200)
      .json({ message: 'Read list updated successfully', readList });
  } catch (err) {
    return res.status(500).json({ status: 'error', message: err });
  }
};
