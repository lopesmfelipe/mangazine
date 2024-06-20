const List = require('../models/listModel');

exports.getAllLists = async (req, res) => {
  try {
    const userId = req.params.userId;

    const lists = await List.find({ clerkUserId: userId });
    
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
};

// CREATE LIST
exports.createList = async (req, res) => {
  try {
    const {name, titles} = req.body;
    const clerkUserId = req.user.id;

    const newList = await List.create({
      name,
      titles,
      clerkUserId
    });
    res.status(201).json({
      status: 'success',
      data: {
        list: newList,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err.messa,
    });
    console.log(err);
  }
};
