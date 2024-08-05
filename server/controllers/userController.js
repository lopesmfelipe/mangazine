const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// CHECK IF USER EXISTS
exports.checkUserExists = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ userId: req.params.userId });

  if (user) {
    return res.status(200).json({ exists: true });
  }
  return res.status(200).json({ exists: false });
});

// CREATE USER
exports.createUser = catchAsync(async (req, res, next) => {
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
});

// GET READLIST
exports.getReadlist = catchAsync(async (req, res, next) => {
  const { userId } = req.params;
  const user = await User.findOne({ userId }).populate('readList');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  const { readList } = user;
  console.log('Fetched Readlist: ', readList);

  res.status(200).json({
    status: 'success',
    readlist: { readList },
  });
});

// CHECK IF ITEM EXISTS IN THE READLIST
exports.checkItemExists = catchAsync(async (req, res, next) => {
  const { userId, titleId } = req.params;
  const user = await User.findOne({ userId: userId });

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  if (user.readList.includes(titleId)) {
    return res.status(200).json({ exists: true });
  }

  return res.status(200).json({ exists: false });
});

// ADD ITEM TO THE READLIST
exports.addToReadlist = catchAsync(async (req, res, next) => {
  const { userId, titleId } = req.params;
  const user = await User.findOne({ userId: userId });

  user.readList.push(titleId);
  await user.save();

  res.status(200).json({
    message: 'Item added successfully',
    readList: user.readList,
  });
});

// REMOVE ITEM FROM THE READLIST
exports.removeFromReadlist = catchAsync(async (req, res, next) => {
  const { userId, titleId } = req.params;
  const user = await User.findOne({ userId: userId });

  user.readList.pull(titleId);
  await user.save();

  res.status(204).send();
});

// GET LISTS
exports.getLists = async (req, res, next) => {
  // Retrieve the userId from the request
  const { userId } = req.params;

  // Find the user by userId and populate the lists field
  const user = await User.findOne({ userId }).populate('lists');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Extract the lists from the user object
  const { lists } = user;

  // Return the lists
  return res.status(200).json({
    status: 'success',
    result: lists.length,
    data: { lists },
  });
};
