"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//const { Schema, model } = require('mongoose');
const mongoose_1 = __importDefault(require("mongoose"));
const titleSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: [true, 'A title must have a name'],
        unique: true,
        trim: true, // Removes whitespace from the beginning and end of the string
        validate: {
            validator: function (value) {
                return value && value.trim().length > 0; // Ensures the name is not an empty string
            },
            message: 'A title name cannot be empty',
        },
    },
    author: String,
    releaseYear: String,
    description: String,
    chapters: String,
    publishedBy: String,
    genre: [String],
    cover: String,
    otherCovers: [String],
    status: String,
    type: String,
    alternateName: String,
});
const Title = mongoose_1.default.model('Title', titleSchema);
module.exports = Title;
