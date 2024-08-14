import { Request, Response, NextFunction } from 'express';
import Rating from '../models/ratingModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';

// GET RATING
export const getRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, titleId } = req.params;

    const userRating = await Rating.findOne({
      userId: userId,
      titleId: titleId,
    });

    if (!userRating) {
      return next(
        new AppError('No rating found for this user with that title', 404),
      );
    }

    res.status(200).json({
      status: 'success',
      message: 'User data rating',
      userRating,
    });
  },
);

// GET AVERAGE RATING
export const getAverageRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { titleId } = req.params;

    const titleRatings = await Rating.aggregate([
      { $match: { titleId: titleId } },
      { $group: { _id: '$titleId', averageRating: { $avg: '$rating' } } },
    ]);

    console.log('Title ratings: ', titleRatings);

    const avgRating = titleRatings.length ? titleRatings[0].averageRating : 0;

    res.status(200).json({
      status: 'success',
      message: 'OVERALL RATING: ',
      averageRating: avgRating,
    });
  },
);

// CREATE OR UPDATE RATING
export const createRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, titleId, ratingValue } = req.body;

    console.log('Received data: ', { userId, titleId, ratingValue });

    // Try to find the existing rating first
    const existingRating = await Rating.findOne({ userId, titleId });

    // Find and update the existing rating, or create a new one if not found
    const rating = await Rating.findOneAndUpdate(
      { userId: userId, titleId: titleId }, // First object with the fields to identify the document
      { rating: ratingValue }, // Second object with the field to be updated and its new value
      { new: true, runValidators: true, upsert: true }, // 'upsert: true' option allows the operation to insert a new document if no matching document is found
    );

    // Determine whether the document was created or updated
    const wasCreated = !existingRating;

    console.log(wasCreated);

    res.status(wasCreated ? 201 : 200).json({
      status: 'success',
      message: wasCreated
        ? 'Rating created successfully'
        : 'Rating updated successfully',
      ratingObject: rating,
    });
  },
);

// DELETE RATING
export const deleteRating = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, titleId } = req.params;

    const rating = await Rating.findOneAndDelete({ userId, titleId });

    if (!rating) {
      return res.status(404).json({
        status: 'fail',
        message: 'No rating found with that userId or titleId',
      });
    }

    res.status(204).send();
  },
);
