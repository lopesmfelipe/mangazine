import { Request, Response, NextFunction } from 'express';
import Title from '../models/titleModel';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { Types } from 'mongoose';

export const getAllTitles = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // BUILD THE QUERY

    // 1A) FILTERING
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);

    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Title.find(JSON.parse(queryStr)); // temporary final query

    // 2) SORTING
    if (typeof req.query.sort === 'string') {
      const sortBy = req.query.sort.split(',').join(' ');
      console.log(sortBy);
      query = query.sort(sortBy);
    } else {
      query = query.sort('name');
    }

    // 3) FIELD LIMITING
    if (typeof req.query.fields === 'string') {
      const fields = req.query.fields.split(',').join(' ');
      console.log(fields);
      query = query.select(fields);
    } else {
      query = query.select('-description');
    }

    // EXECUTE THE QUERY
    const titles = await query;

    res.status(200).json({
      status: 'success',
      result: titles.length,
      data: {
        titles,
      },
    });
  },
);

// GET TITLE BY ID
export const getTitleById = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const title = await Title.findById(req.params.titleId);

    if (!title) {
      return next(new AppError('No title found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      title,
    });
  },
);

// GET TITLE BY NAME
export const getTitlesByName = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { titleName } = req.params; // Get the query parameter from the URL
    if (typeof titleName === 'string') {
      const titles = await Title.find({ name: new RegExp(titleName, 'i') }); // Perform case-insensitive search

      if (titles.length === 0) {
        return next(new AppError('No title found with that name', 404));
      }

      res.status(200).json({
        status: 'success',
        message: `${titles.length} items found.`,
        titles,
      });
    }
  },
);

// CREATE TITLE      This entire async fn is passed as parameter to catchAsync
export const createTitle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const newTitle = await Title.create(req.body);
    res.status(201).json({
      status: 'Success',
      data: {
        title: newTitle,
      },
    });
  },
);

// UPDATE TITLE
export const updateTitle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { titleId } = req.params;

    const updates = req.body;

    const title = await Title.findOneAndUpdate({ _id: titleId }, updates, {
      new: true, // Return the updated document
      runValidators: true,
    });

    res.status(200).json({
      status: 'success',
      message: 'Title updated succesfully',
      data: {
        title,
      },
    });
  },
);

// DELETE TITLE
export const deleteTitle = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // Validate the ID
    const { id } = req.params;
    if (!Types.ObjectId.isValid(id)) {
      return next(new AppError('Invalid ID format', 400));
    }

    const title = await Title.findOneAndDelete({ _id: id });

    if (!title) {
      return next(
        new AppError('No title found with that with that id to delete', 404),
      );
    }

    res.status(204).json({
      status: 'success',
      data: null,
    });
  },
);
