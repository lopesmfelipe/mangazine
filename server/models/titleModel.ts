//const { Schema, model } = require('mongoose');
import mongoose from 'mongoose';

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A title must have a name'],
    unique: true,
    trim: true, // Removes whitespace from the beginning and end of the string
    validate: {
      validator: function (value : string) {
        return value && value.trim().length > 0; // Ensures the name is not an empty string
      },
      message: 'A title name cannot be empty',
    },
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
});

const Title = mongoose.model('Title', titleSchema);

module.exports = Title;
