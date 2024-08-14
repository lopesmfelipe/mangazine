import express from 'express';
import {
  getRating,
  getAverageRating,
  createRating,
  deleteRating,
} from '../controllers/ratingController';

const router = express.Router();

// Get rating
router.route('/:userId/get-rating/:titleId').get(getRating);

// Get average rating
router.route('/average-rating/:titleId').get(getAverageRating);

// Create or update rating
router.route('/create-update-rating').post(createRating);

// Delete rating
router.route('/:userId/delete-rating/:titleId').delete(deleteRating);

export default router;
