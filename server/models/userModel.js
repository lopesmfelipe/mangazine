const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  userName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  readList: { type: mongoose.Schema.Types.ObjectId, ref: 'List' },
  lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
