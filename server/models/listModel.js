const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  name: String,
  titles: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Title' }], // Array of strings representing titles
  clerkUserId: String // Store Clerk user ID
});


const List = mongoose.model('List', listSchema);

// Export the model
module.exports = List;