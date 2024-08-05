const User = require('../models/userModel');
const List = require('../models/listModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

// GET LIST BY ID
exports.getListById = catchAsync(async (req, res, next) => {
  const list = await List.findById(req.params.userId).populate('titles');
  if (!list) {
    return next(new AppError('List not found', 404));
  }

  res.status(200).json({
    status: 'sucess',
    data: {
      list,
    },
  });
});

// CHECK IF TITLE EXISTS IN THE LIST
exports.checkTitleExists = catchAsync(async (req, res, next) => {
  const list = await List.findOne({ _id: req.params.listId });

  if (list.titles.includes(req.params.titleId)) {
    return res.status(200).json({ exists: true });
  }

  return res.status(200).json({ exists: false });
});

// CREATE LIST
exports.createList = catchAsync(async (req, res, next) => {
  const { name, titles, userId } = req.body;

  const newList = await List.create({
    name,
    titles,
    userId,
  });

  await User.findOneAndUpdate(
    { userId },
    { $push: { lists: newList._id } },
    { new: true, useFindAndModify: false },
  );

  res.status(201).json({
    status: 'success',
    data: {
      list: newList,
    },
  });
});

// UPDATE LIST
exports.updateList = catchAsync(async (req, res, next) => {
  const { titleId, listId } = req.body;

  const list = await List.findOne({ _id: listId });

  if (!list) {
    return res.status(404).json({ message: 'List not found' });
  }

  if (list.titles.includes(titleId)) {
    list.titles.pull(titleId);
    await list.save();

    return res.status(200).json({
      status: 'success',
      message: 'Title removed from the list',
      list: list,
    });
  }

  list.titles.push(titleId);
  await list.save();

  res.status(200).json({
    status: 'success',
    message: 'List updated succesfully',
    list: list,
  });
});
