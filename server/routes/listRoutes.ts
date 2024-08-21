import express from 'express';
import {
  checkTitleExists,
  getListById,
  createList,
  addToList,
  removeFromList,
  getAllLists,
} from '../controllers/listController';

const router = express.Router();

router.route('/:listId/titles/:titleId/exists').get(checkTitleExists);

router.route('/get-all-lists/:userId').get(getAllLists);
router.route('/:userId').get(getListById);
router.route('/create-list').post(createList);
router.route('/:listId/add-to-list/:titleId').patch(addToList);
router.route('/remove-from-list').patch(removeFromList);

export default router;
