//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A title must have a name'],
    unique: true,
  },
  author: String,
  releaseYear: String,
  description: String,
  chapters: String,
  publishedBy: String,
  genre: [String],
  cover: String,
  otherCovers: [String],
  status: String,
  type: String,
  alternateName: String,
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
});

const Title = mongoose.model('Title', titleSchema);

module.exports = Title;
