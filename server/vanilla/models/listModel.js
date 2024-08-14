"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const listSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    titles: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Title' }], // Array of strings representing titles
    userId: { type: String, required: true }, // Store Clerk user ID
}, { timestamps: true });
const List = mongoose_1.default.model('List', listSchema);
exports.default = List;
/*
const List = require('./models/list');

List.findOne({ name: 'My List' })
  .populate('titles') // Populate the 'titles' field with actual title documents
  .exec((err, list) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(list);
  });

In this example:

findOne is used to find a single list document based on some query criteria.
populate('titles') tells Mongoose to replace the ObjectIds in the titles field with actual title documents.
When you execute the query using exec, the list object returned will contain the populated titles field, where each element is an actual title document instead of just an ObjectId.
This makes it convenient to work with related documents in Mongoose, as you can retrieve the related documents in a single query rather than manually fetching them separately.

*/
