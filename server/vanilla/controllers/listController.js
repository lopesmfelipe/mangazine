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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateList = exports.createList = exports.checkTitleExists = exports.getListById = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const listModel_1 = __importDefault(require("../models/listModel"));
const appError_1 = __importDefault(require("../utils/appError"));
const catchAsync_1 = __importDefault(require("../utils/catchAsync"));
// GET LIST BY ID
exports.getListById = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield listModel_1.default.findById(req.params.userId).populate('titles');
    if (!list) {
        return next(new appError_1.default('List not found', 404));
    }
    res.status(200).json({
        status: 'sucess',
        data: {
            list,
        },
    });
}));
// CHECK IF TITLE EXISTS IN THE LIST
exports.checkTitleExists = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const list = yield listModel_1.default.findOne({ _id: req.params.listId });
    if (!list) {
        return next(new appError_1.default('List not found', 404));
    }
    if (list.titles.includes(req.params.titleId)) {
        return res.status(200).json({ exists: true });
    }
    return res.status(200).json({ exists: false });
}));
// CREATE LIST
exports.createList = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, titles, userId } = req.body;
    const newList = yield listModel_1.default.create({
        name,
        titles,
        userId,
    });
    yield userModel_1.default.findOneAndUpdate({ userId }, { $push: { lists: newList._id } }, { new: true, useFindAndModify: false });
    res.status(201).json({
        status: 'success',
        data: {
            list: newList,
        },
    });
}));
// UPDATE LIST
exports.updateList = (0, catchAsync_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { titleId, listId } = req.body;
    const list = yield listModel_1.default.findOne({ _id: listId });
    if (!list) {
        return next(new appError_1.default('List not found', 404));
    }
    if (list.titles.includes(titleId)) {
        list.titles.pull(titleId);
        yield list.save();
        return res.status(200).json({
            status: 'success',
            message: 'Title removed from the list',
            list: list,
        });
    }
    list.titles.push(titleId);
    yield list.save();
    res.status(200).json({
        status: 'success',
        message: 'List updated succesfully',
        list: list,
    });
}));
