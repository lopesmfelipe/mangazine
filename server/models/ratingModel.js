const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref: 'User',
      required: true,
    },
    titleId: {
      type: String,
      ref: 'Title',
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 10,
    },
  },
  { timestamps: true }, // This adds 'createdAt' and 'updatedAt' fields
);

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
