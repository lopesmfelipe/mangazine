const express = require('express');
const listController = require('..//controllers/listController');

const router = express.Router();

router.route('/user/:userId/lists').get(listController.getAllLists);

module.exports = router;
