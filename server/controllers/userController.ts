import { Request, Response, NextFunction } from 'express';
import User from '../models/userModel';
import AppError from '../utils/appError';
import catchAsync from '../utils/catchAsync';
import { Types } from 'mongoose';

// CHECK IF USER EXISTS
export const checkUserExists = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ userId: req.params.userId });

    if (user) {
      return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
  },
);

// GET USER ROLE
export const getUserRole = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findOne({ userId: req.params.userId });

    if (!user) {
      return next(new AppError('User not found', 404));
    }
    return res.status(200).json({
      status: 'success',
      userRole: user.role,
    });
  },
);

// CREATE USER
export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userName, email, userId } = req.body;

    const newUser = await User.create({
      userName,
      email,
      userId,
    });
    res.status(201).json({
      status: 'success',
      data: {
        list: newUser,
      },
    });
  },
);

// GET READLIST
export const getReadlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    const user = await User.findOne({ userId }).populate({
      path: 'readList',
      select: 'name cover author releaseYear', // Selecting only the necessary fields
    });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    const { readList } = user;
    console.log('Fetched Readlist: ', readList);

    res.status(200).json({
      status: 'success',
      readList,
    });
  },
);

// CHECK IF ITEM EXISTS IN THE READLIST
export const checkItemExists = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, titleId } = req.params;

    // Validate and convert titleId to ObjectId
    let titleObjectId: Types.ObjectId;

    try {
      titleObjectId = new Types.ObjectId(titleId); // Validate
    } catch (error) {
      return next(new AppError('Invalid title ID format', 400));
    }

    const user = await User.findOne({ userId: userId });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    if (user.readList.includes(titleId as any)) {
      return res.status(200).json({ exists: true });
    }

    return res.status(200).json({ exists: false });
  },
);

// ADD ITEM TO THE READLIST
export const addToReadlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, titleId } = req.params;
    const user = await User.findOne({ userId: userId });

    if (!user) {
      return next(new AppError('User not found', 404));
    }

    user.readList.push(titleId as any);
    await user.save();

    res.status(200).json({
      message: 'Item added successfully',
      readList: user.readList,
    });
  },
);

// REMOVE ITEM FROM THE READLIST
export const removeFromReadlist = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId, titleId } = req.params;

    const result = await User.updateOne(
      { userId: userId },
      { $pull: { readList: titleId } },
    );

    if (result.matchedCount === 0) {
      return next(new AppError('User not found', 404));
    }

    /* 
    const user = await User.findOne({ userId: userId });

    if (!user) {
      return next(new AppError('User not found', 404));
    }
    // Filter out the titleId from the readList (alternative method)
    user.readlist = user.readList.filter((id) => id.toString() !== titleId)
    user.readList.pull(titleId);
    await user.save();
    */

    res.status(204).send();
  },
);

// GET LISTS
export const getLists = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // Retrieve the userId from the request
  const { userId } = req.params;

  // Find the user by userId and populate the lists field
  const user = await User.findOne({ userId }).populate('lists');

  if (!user) {
    return next(new AppError('User not found', 404));
  }

  // Extract the lists from the user object
  const { lists } = user;

  // Return the lists
  return res.status(200).json({
    status: 'success',
    result: lists.length,
    data: { lists },
  });
};
