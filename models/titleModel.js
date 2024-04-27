const { Schema, model } = require('mongoose');

const titleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  author: String,
  releaseDate: Number,
})

const Title = model("Title", titleSchema);

const t = new Title({
  name: "Dandadan",
  author: "Kishimoto",
  releaseDate: 2020
});

module.exports = Title;