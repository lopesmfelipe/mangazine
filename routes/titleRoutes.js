const express = require('express');
const titleController = require('../controllers/titleController');

const router = express.Router();

router.route('/').post(titleController.createTitle);

module.exports = router;
