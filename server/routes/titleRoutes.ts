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
router.route('/:id').get(getTitleById);
router.route('/search').get(getTitlesByName);

router.route('/:titleId').patch(updateTitle);

router.route('/').post(createTitle);
router.route('/:id').delete(deleteTitle);

export default router;
