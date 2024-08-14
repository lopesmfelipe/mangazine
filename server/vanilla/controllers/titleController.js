"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTitle = exports.updateTitle = exports.createTitle = exports.getTitlesByName = exports.getTitleById = exports.getAllTitles = void 0;
const Title = require('../models/titleModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
exports.getAllTitles = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // BUILD THE QUERY
    // 1A) FILTERING
    const queryObj = Object.assign({}, req.query);
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((el) => delete queryObj[el]);
    // 1B) ADVANCED FILTERING
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    let query = Title.find(JSON.parse(queryStr)); // temporary final query
    // 2) SORTING
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        console.log(sortBy);
        query = query.sort(sortBy);
    }
    else {
        query = query.sort('name');
    }
    // 3) FIELD LIMITING
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ');
        console.log(fields);
        query = query.select(fields);
    }
    else {
        query = query.select('-description');
    }
    // EXECUTE THE QUERY
    const titles = yield query;
    res.status(200).json({
        status: 'success',
        result: titles.length,
        data: {
            titles,
        },
    });
}));
// GET TITLE BY ID
exports.getTitleById = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = yield Title.findById(req.params.id);
    if (!title) {
        return next(new AppError('No title found with that ID', 404));
    }
    res.status(200).json({
        status: 'success',
        data: {
            title,
        },
    });
}));
// GET TITLE BY NAME
exports.getTitlesByName = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = req.query; // Get the query parameter from the URL
    const titles = yield Title.find({ name: new RegExp(name, 'i') }); // Perform case-insensitive search
    if (titles.length === 0) {
        return next(new AppError('No title found with that name', 404));
    }
    res.status(200).json({
        status: 'success',
        message: `${titles.length} items found.`,
        data: {
            titles,
        },
    });
}));
// CREATE TITLE      This entire async fn is passed as parameter to catchAsync
exports.createTitle = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const newTitle = yield Title.create(req.body);
    res.status(201).json({
        status: 'Success',
        data: {
            title: newTitle,
        },
    });
}));
// UPDATE TITLE
exports.updateTitle = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { titleId } = req.params;
    const updates = req.body;
    const title = yield Title.findOneAndUpdate({ _id: titleId }, updates, {
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
}));
// DELETE TITLE
exports.deleteTitle = catchAsync((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const title = yield Title.findOneAndDelete(req.params.id);
    if (!title) {
        return next(new AppError('No title found with that with that id to delete', 404));
    }
    res.status(204).json({
        status: 'success',
        data: null,
    });
}));
