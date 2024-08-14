import express from 'express';
import {
  createUser,
  checkUserExists,
  getUserRole,
  getReadlist,
  checkItemExists,
  addToReadlist,
  removeFromReadlist,
  getLists,
} from '../controllers/userController';

const router = express.Router();

/* router.route('/').get(userController.getAllUsers); */

router.route('/signup').post(createUser);

// Check user exists
router.route('/exists/:userId').get(checkUserExists);

// Get user role
router.route('/get-role/:userId').get(getUserRole);

// Get readlist
router.route('/readlist/:userId').get(getReadlist);

// Check title exists in the readlist
router
  .route('/readlist/:userId/check-item-exists/:titleId')
  .get(checkItemExists);

// Add item to the readlist
router.route('/readlist/:userId/add-to-readlist/:titleId').patch(addToReadlist);

// Remove item from the readlist
router
  .route('/readlist/:userId/remove-from-readlist/:titleId')
  .delete(removeFromReadlist);

// Get lists
router.route('/lists/:userId').get(getLists);

export default router;
