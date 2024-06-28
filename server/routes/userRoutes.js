const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

/* router.route('/').get(userController.getAllUsers); */

router.route('/signup').post(userController.createUser);

router.route('/exists/:id').get(userController.checkUserExists);

router.route('/update-readlist').patch(userController.updateReadlist);

router.route('/lists').get(userController.getLists);

module.exports = router;
