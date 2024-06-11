const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: String,
  titles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Title' }], // Array of strings representing titles
  clerkUserId: String, // Store Clerk user ID
});

const List = mongoose.model('List', listSchema);

module.exports = List;


/*
const List = require('./models/list');

List.findOne({ name: 'My List' })
  .populate('titles') // Populate the 'titles' field with actual title documents
  .exec((err, list) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(list);
  });

In this example:

findOne is used to find a single list document based on some query criteria.
populate('titles') tells Mongoose to replace the ObjectIds in the titles field with actual title documents.
When you execute the query using exec, the list object returned will contain the populated titles field, where each element is an actual title document instead of just an ObjectId.
This makes it convenient to work with related documents in Mongoose, as you can retrieve the related documents in a single query rather than manually fetching them separately.

*/