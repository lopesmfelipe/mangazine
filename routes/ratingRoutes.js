const express = require('express');

const router = express.Router();


const { Title, User, Rating } = require('../models/ratingModel');

router.post('/rate/:titleId', async (req, res) => {
  const { titleId } = req.params;
  const { userId, rating } = req.body;

  try {
    const existingRating = await Rating.findOne({ user: userId, title: titleId });

    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      await Rating.create({ user: userId, title: titleId, rating });
    }
    res.status(200).json({ message: 'Rating submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/average-rating/:titleId', async (req, res) => {
  const { titleId } = req.params;

  try {
    const averageRating = await Rating.aggregate([
      { $match: { title: mongoose.Types.ObjectId(titleId) } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } },
    ]);

    if (averageRating.length > 0) {
      res.status(200).json({ averageRating: averageRating[0].avgRating });
    } else {
      res.status(404).json({ message: 'No ratings found for the title' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
