"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
/* router.route('/').get(userController.getAllUsers); */
router.route('/signup').post(userController_1.createUser);
// Check user exists
router.route('/exists/:userId').get(userController_1.checkUserExists);
// Get user role
router.route('/get-role/:userId').get(userController_1.getUserRole);
// Get readlist
router.route('/readlist/:userId').get(userController_1.getReadlist);
// Check title exists in the readlist
router
    .route('/readlist/:userId/check-item-exists/:titleId')
    .get(userController_1.checkItemExists);
// Add item to the readlist
router.route('/readlist/:userId/add-to-readlist/:titleId').patch(userController_1.addToReadlist);
// Remove item from the readlist
router
    .route('/readlist/:userId/remove-from-readlist/:titleId')
    .delete(userController_1.removeFromReadlist);
// Get lists
router.route('/lists/:userId').get(userController_1.getLists);
exports.default = router;
