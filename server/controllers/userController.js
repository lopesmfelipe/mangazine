const User = require('../models/userModel');

exports.getReadlist = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ userId }).populate('readList');

    if (!user) {
      return res.status(404).json({ message: 'User not foun' });
    }

    const { readList } = user;
    console.log('Fetched Readlist: ', readList);

    res.status(200).json({
      status: 'success',
      data: { readList },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'Server Error' });
  }
};

exports.getLists = async (req, res) => {
  try {
    // Retrieve the userId from the request
    const userId = req.params.id;

    // Find the user by userId and populate the lists field
    const user = await User.findOne({ userId }).populate('lists');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Extract the lists from the user object
    const { lists } = user;

    console.log('Fetched lists: ', lists);

    // Return the lists
    return res.status(200).json({
      status: 'success',
      result: lists.length,
      data: { lists },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error' });
  }
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
