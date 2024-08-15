import express from 'express';
import {
  getAllTitles,
  getTitleById,
  getTitlesByName,
  updateTitle,
  createTitle,
  deleteTitle,
} from '../controllers/titleController';

const router = express.Router();

router.route('/').get(getAllTitles);
router.route('/search/:titleName').get(getTitlesByName);
router.route('/:titleId').get(getTitleById);

router.route('/update-title/:titleId').patch(updateTitle);
router.route('/create-title').post(createTitle);
router.route('/delete/:titleId').delete(deleteTitle);

export default router;
