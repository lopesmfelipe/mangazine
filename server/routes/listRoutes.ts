import express from 'express';
import {
  checkTitleExists,
  getListById,
  createList,
  updateList,
} from '../controllers/listController';

const router = express.Router();

router.route('/:listId/titles/:titleId/exists').get(checkTitleExists);

/* router.route('/').get(getAllLists); */
router.route('/:userId').get(getListById);
router.route('/create-list').post(createList);
router.route('/update-list').patch(updateList);

export default router;
