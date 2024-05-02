//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A title must have a name'],
    unique: true,
  },
  author: String,
  releaseDate: Date,
  volumes: Number,
  publishedBy: String,
  genre: [String],
  ratingsAverage: {
    type: Number,
    default: 0
  },
  ratingsQuantity: {
    type: Number,
    default: 0
  }
});

const Title = mongoose.model('Title', titleSchema);

module.exports = Title;
