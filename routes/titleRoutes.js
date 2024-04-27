const express = require('express');
const titleController = require('../controllers/titleController');

const router = express.Router();

router.route('/api/v1/titles').post(titleController.createTitle);

module.exports = router;
