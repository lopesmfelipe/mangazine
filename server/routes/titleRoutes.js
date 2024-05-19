const express = require('express');
const titleController = require('../controllers/titleController');

const router = express.Router();

router.route('/').get(titleController.getAllTitles);
router.route('/').post(titleController.createTitle);
router.route('/:id').delete(titleController.deleteTitle);

module.exports = router;
