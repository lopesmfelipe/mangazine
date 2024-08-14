"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ratingController_1 = require("../controllers/ratingController");
const router = express_1.default.Router();
// Get rating
router.route('/:userId/get-rating/:titleId').get(ratingController_1.getRating);
// Get average rating
router.route('/average-rating/:titleId').get(ratingController_1.getAverageRating);
// Create or update rating
router.route('/create-update-rating').post(ratingController_1.createRating);
// Delete rating
router.route('/:userId/delete-rating/:titleId').delete(ratingController_1.deleteRating);
exports.default = router;
