const express = require('express');
const listController = require('../controllers/listController');

const router = express.Router();

router
  .route('/:listId/titles/:titleId/exists')
  .get(listController.checkTitleExists);

/* router.route('/').get(listController.getAllLists); */
router.route('/:userId').get(listController.getListById);
router.route('/create-list').post(listController.createList);
router.route('/update-list').patch(listController.updateList);

module.exports = router;
