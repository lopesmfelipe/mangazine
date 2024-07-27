const express = require('express');
const ratingController = require('../controllers/ratingController');

const router = express.Router();

// Get rating
router.route('/:userId/get-rating/:titleId').get(ratingController.getRating);

router.route('/:id/average-rating').get(ratingController.getAverageRating);

router.route('/create-update-rating').post(ratingController.createRating);

module.exports = router;
