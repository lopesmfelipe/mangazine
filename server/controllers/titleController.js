const Title = require('../models/titleModel');

exports.getAllTitles = async (req, res) => {

  try {
    // BUILD THE QUERY

    // 1A) FILTERING
    const queryObj = {...req.query};
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
      console.log(fields)
      query = query.select(fields);
    } else {
      query = query.select('-descriptioin')
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.createTitle = async (req, res) => {
  try {
    const newTitle = await Title.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        title: newTitle,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.deleteTitle = async (req, res) => {
  try {
    const title = await Title.findOneAndDelete(req.params.id);

    if (!title) {
      return res.status(404).json({
        status: 'fail',
        message: 'Title not found',
      });
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/* exports.updateTitle = (req, res) => {
  if (req.params.id * 1 >= titles.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  } 

  res.status(200).json({
    status: 'success',
    data: {
      title: '<Updated title placeholder>',
    },
  });
};
*/

/* exports.deleteTour = (req, res) => {
  if (req.params.id * 1 >= titles.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
}; */
