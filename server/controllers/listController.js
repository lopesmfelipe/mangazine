const List = require('../models/listModel');

exports.getAllLists = async (req, res) => {
  try {
    const userId = req.params.userId;

    const lists = await List.find({ clerkUserId: userId});
  
    res.status(200).json({
      status: 'success',
      result: lists.length,
      data: {
        lists,
      },
    })
  
  } catch (err) {
    res.staus(400).json({
      status: 'fail',
      message: err,
    })
  }
}