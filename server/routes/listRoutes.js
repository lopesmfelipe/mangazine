const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router.route('/user/:userId/lists').get(listController.getAllLists);

router.route('/create-list').post(listController.createList);


module.exports = router;
