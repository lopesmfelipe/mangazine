const express = require('express');
const ratingController = require('../controllers/ratingController');

const router = express.Router();

// Get rating
router.route('/:userId/get-rating/:titleId').get(ratingController.getRating);

// Get average rating
router.route('/average-rating/:titleId').get(ratingController.getAverageRating);

// Create or update rating
router.route('/create-update-rating').post(ratingController.createRating);

// Delete rating
router
  .route('/:userId/delete-rating/:titleId').delete(ratingController.deleteRating);

module.exports = router;
