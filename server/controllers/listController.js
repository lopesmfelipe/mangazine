const User = require('../models/userModel');
const List = require('../models/listModel');

/* exports.getAllLists = async (req, res) => {
  try {
    const { userId } = req.body;

    const lists = await List.find({ userId: userId });

    res.status(200).json({
      status: 'success',
      result: lists.length,
      data: {
        lists,
      },
    });
  } catch (err) {
    res.staus(400).json({
      status: 'fail',
      message: err,
    });
  }
}; */

exports.getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate('titles');
    res.status(200).json({
      status: 'sucess',
      data: {
        list,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'Unable to find the list',
    });
  }
};

// CREATE LIST
exports.createList = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.message,
    });
    console.log('Error creating list', err);
  }
};
