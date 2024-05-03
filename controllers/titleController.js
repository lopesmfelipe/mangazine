const Title = require('../models/titleModel');

exports.getAllTitles = async (req, res) => {
  try {
    const titles = await Title.find();
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
