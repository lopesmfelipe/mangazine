const Rating = require('../models/ratingModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getRating = catchAsync(async (req, res, next) => {
  const { userId, titleId } = req.params;

  const userRating = await Rating.findOne({ user: userId, title: titleId });

  if (!userRating) {
    return next(new AppError('No rating found for this user and title', 404));
  }

  res.status(200).json({
    status: 'success',
    message: 'User data rating',
    data: {
      ratingData: userRating,
    },
  });
});

exports.getAverageRating = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const titleRatings = await Rating.aggregate([
    { $match: { titleId: id } },
    { $group: { title: '$titleId', averageRating: { $avg: '$rating' } } },
  ]);

  const overallRating = titleRatings.length ? titleRatings[0].averageRating : 0;

  res.status(200).json({
    status: 'success',
    message: 'Overall rating: ',
    data: {
      overallRating,
    },
  });
});

exports.createRating = catchAsync(async (req, res, next) => {
  const { userId, titleId, ratingValue } = req.body;

  // Find and update the existing rating, or create a new one if not found
  const existingRating = await Rating.findOneAndUpdate(
    { user: userId, title: titleId },
    { rating: ratingValue },
    { new: true, runValidators: true, upsert: true }, // 'upsert: true' option allows the operation to insert a new document if no matching document is found
  );

  // Determine whether the document was newly created or updated
  const wasCreated = existingRating.createdAt === existingRating.updatedAt;

  res.status(wasCreated ? 201 : 200).json({
    status: 'success',
    message: wasCreated
      ? 'Rating created successfully'
      : 'Rating updated successfully',
    data: {
      rating: existingRating,
    },
  });
});
