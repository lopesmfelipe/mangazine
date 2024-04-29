//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A title must have a name'],
    unique: true,
  },
  author: String,
  releaseDate: Number,
});

const Title = mongoose.model('Title', titleSchema);

module.exports = Title;
