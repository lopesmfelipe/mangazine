//const { Schema, model } = require('mongoose');
const mongoose = require('mongoose');

const titleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A title must have a name'],
    trim: true,

  },
  author: {
    type: String,
    trim: true
  },
  releaseDate: {
    type: Number,
    trim: true
  },
})

const Title = mongoose.model("Title", titleSchema);

const t = new Title({
  name: "Dandadan",
  author: "Kishimoto",
  releaseDate: 2020
});

module.exports = Title;