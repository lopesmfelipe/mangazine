const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  readList: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;