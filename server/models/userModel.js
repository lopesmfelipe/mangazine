const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    readList: [{ type: String }],
    lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  },
  { timestamps: true },
);

const User = mongoose.model('User', userSchema);

module.exports = User;
