const Title = require('../models/titleModel');

exports.createTitle = async (req, res) => {
  const newTitle = await Title.create(req.body);

  res.status(201).json({
    status: 'Success',
    data: {
      title: newTitle,
    },
  });
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
