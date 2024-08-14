"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const listController_1 = require("../controllers/listController");
const router = express_1.default.Router();
router.route('/:listId/titles/:titleId/exists').get(listController_1.checkTitleExists);
/* router.route('/').get(getAllLists); */
router.route('/:userId').get(listController_1.getListById);
router.route('/create-list').post(listController_1.createList);
router.route('/update-list').patch(listController_1.updateList);
exports.default = router;
