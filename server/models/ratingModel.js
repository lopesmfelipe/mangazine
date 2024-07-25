const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  title: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Title',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 10,
  },
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
