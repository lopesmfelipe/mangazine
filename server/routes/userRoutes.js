const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* router.route('/').get(userController.getAllUsers); */

router.route('/signup').post(userController.createUser);

// Check user exists
router.route('/exists/:userId').get(userController.checkUserExists);

// Get readlist
router.route('/readlist/:userId').get(userController.getReadlist);

// Check title exists in the readlist
router
  .route('/readlist/:userId/check-item-exists/:titleId')
  .get(userController.checkItemExists);

// Add item to the readlist
router
  .route('/readlist/:userId/add-to-readlist/:titleId')
  .patch(userController.addToReadlist);

// Remove item from the readlist
router
  .route('/readlist/:userId/remove-from-readlist/:titleId')
  .delete(userController.removeFromReadlist);

// Get lists
router.route('/lists/:userId').get(userController.getLists);

module.exports = router;
