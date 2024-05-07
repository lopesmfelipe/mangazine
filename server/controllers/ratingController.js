// Import the Rating model
const Rating = require('../models/ratingModel');

exports.createRating = async (ratingData) => {
  try {
    const existingRating = await Rating.findOne({
      user: ratingData.userId,
      title: ratingData.titleId,
    });

    if (existingRating) {
      existingRating.rating = ratingData.ratingValue;
      await existingRating.updateOne;
      return { status: 200, message: 'Rating updated successfully' };
    }

    const newRating = Rating.create(ratingData.body);
    return {
      status: 201,
      message: 'Rating created successfully',
      data: newRating,
    };
    
  } catch (err) {
    return { status: 500, message: err };
  }
};
