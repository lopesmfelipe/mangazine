import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import List from '../models/listModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';

// GET LIST BY ID
export const getListById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const list = await List.findById(req.params.userId).populate('titles');
    if (!list) {
      return next(new AppError('List not found', 404));
    }

    res.status(200).json({
      status: 'sucess',
      data: {
        list,
      },
    });
  },
);

// CHECK IF TITLE EXISTS IN THE LIST
export const checkTitleExists = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const list = await List.findOne({ _id: req.params.listId });

    if (!list) {
      return next(new AppError('List not found', 404));
    }

    if (list.titles.includes(req.params.titleId)) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });
  },
);

// CREATE LIST
export const createList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, titles, userId } = req.body;

    const newList = await List.create({
      name,
      titles,
      userId,
    });

    await User.findOneAndUpdate(
      { userId },
      { $push: { lists: newList._id } },
      { new: true, useFindAndModify: false },
    );

    res.status(201).json({
      status: 'success',
      data: {
        list: newList,
      },
    });
  },
);

// UPDATE LIST
export const updateList = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { titleId, listId } = req.body;

    const list = await List.findOne({ _id: listId });

    if (!list) {
      return next(new AppError('List not found', 404));
    }

    if (list.titles.includes(titleId)) {
      list.titles.pull(titleId);
      await list.save();

      return res.status(200).json({
        status: 'success',
        message: 'Title removed from the list',
        list: list,
      });
    }

    list.titles.push(titleId);
    await list.save();

    res.status(200).json({
      status: 'success',
      message: 'List updated succesfully',
      list: list,
    });
  },
);
