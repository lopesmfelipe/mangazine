const Title = require('../models/titleModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllTitles = catchAsync(async (req, res, next) => {
  // BUILD THE QUERY

  // 1A) FILTERING
  const queryObj = { ...req.query };
  const excludeFields = ['page', 'sort', 'limit', 'fields'];
  excludeFields.forEach((el) => delete queryObj[el]);

  // 1B) ADVANCED FILTERING
  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

  let query = Title.find(JSON.parse(queryStr)); // temporary final query

  // 2) SORTING
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    console.log(sortBy);
    query = query.sort(sortBy);
  } else {
    query = query.sort('name');
  }

  // 3) FIELD LIMITING
  if (req.query.fields) {
    const fields = req.query.fields.split(',').join(' ');
    console.log(fields);
    query = query.select(fields);
  } else {
    query = query.select('-description');
  }

  // EXECUTE THE QUERY
  const titles = await query;

  res.status(200).json({
    status: 'success',
    result: titles.length,
    data: {
      titles,
    },
  });
});

// GET TITLE BY ID
exports.getTitleById = catchAsync(async (req, res, next) => {
  const title = await Title.findById(req.params.id);

  if (!title) {
    return next(new AppError('No title found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      title,
    },
  });
});

// GET TITLE BY NAME
exports.getTitlesByName = catchAsync(async (req, res, next) => {
  const { name } = req.query; // Get the query parameter from the URL
  const titles = await Title.find({ name: new RegExp(name, 'i') }); // Perform case-insensitive search

  if (titles.length === 0) {
    return next(new AppError('No title found with that name', 404));
  }

  res.status(200).json({
    status: 'success',
    message: `${titles.length} items found.`,
    data: {
      titles,
    },
  });
});

// CREATE TITLE      This entire async fn is passed as parameter to catchAsync
exports.createTitle = catchAsync(async (req, res, next) => {
  const newTitle = await Title.create(req.body);
  res.status(201).json({
    status: 'Success',
    data: {
      title: newTitle,
    },
  });
});

// UPDATE TITLE
exports.updateTitle = catchAsync(async (req, res, next) => {
  const { titleId } = req.params;

  const updates = req.body;

  const title = await Title.findOneAndUpdate({ _id: titleId }, updates, {
    new: true, // Return the updated document
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    message: 'Title updated succesfully',
    data: {
      title,
    },
  });
});

// DELETE TITLE
exports.deleteTitle = catchAsync(async (req, res, next) => {
  const title = await Title.findOneAndDelete(req.params.id);

  if (!title) {
    return next(
      new AppError('No title found with that with that id to delete', 404),
    );
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
