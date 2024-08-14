"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ratingSchema = new mongoose_1.default.Schema({
    userId: {
        type: String,
        ref: 'User',
        required: true,
    },
    titleId: {
        type: String,
        ref: 'Title',
        required: true,
    },
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 10,
    },
}, { timestamps: true });
const Rating = mongoose_1.default.model('Rating', ratingSchema);
module.exports = Rating;
