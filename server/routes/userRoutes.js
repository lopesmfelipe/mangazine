const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.route('/').get(userController.getAllUsers);

router.route('/signup').post(userController.createUser);

router.route('/exists/:id').get(userController.checkUserExists);

router.route('/update-readlist/:id').patch(userController.updateReadlist);

module.exports = router;
