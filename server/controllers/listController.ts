import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import List from '../models/listModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { Types } from 'mongoose';

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
    const { listId, titleId } = req.params;

    // Validate listId and titleId
    if (!Types.ObjectId.isValid(listId) || !Types.ObjectId.isValid(titleId)) {
      return next(new AppError('Invalid list or title ID format', 400));
    }

    // Using projection to check for the title's existence
    // and only passing the '_id' to the 'list' variable, instead of the full list document, with other fields like 'name'
    const list = await List.findOne(
      { _id: listId, titles: titleId }, // Filter the List collection for a document with the  fields '_id' and 'titles' equal to the listId and titleId received in the params
      { _id: 1 }, // Only fetch(projects/returns) the _id field, so we don't need to return the full document(heavier)
    );

    if (list) {
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

    if (!Types.ObjectId.isValid(titleId) || !Types.ObjectId.isValid(listId)) {
      return next(new AppError('Invalid title or list ID format', 400));
    }

    const titleObjectId = new Types.ObjectId(titleId);

    const list = await List.findOne({ _id: listId });

    if (!list) {
      return next(new AppError('List not found', 404));
    }

    if (list.titles.includes(titleObjectId)) {
      await List.updateOne(
        { _id: listId },
        { $pull: { titles: titleObjectId } },
      );

      return res.status(200).json({
        status: 'success',
        message: 'Title removed from the list',
        list: list,
      });
    } else {
      await List.updateOne(
        { _id: listId },
        { $push: { titles: titleObjectId } },
      );
      res.status(200).json({
        status: 'success',
        message: 'Title added to the list',
        list: list,
      });
    }
  },
);
