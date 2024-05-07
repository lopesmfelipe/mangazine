const express = require('express');
const titleController = require('../controllers/titleController');
const ratingController= require('../controllers/ratingController');

const router = express.Router();

router.route('/').get(titleController.getAllTitles);
router.route('/').post(titleController.createTitle);
router.route('/:id').delete(titleController.deleteTitle);

router.post('/', async (req, res) => {
  const result = await ratingController.createRating()
})

module.exports = router;
