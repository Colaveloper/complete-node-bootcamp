const express = require('express');
const userController = require('../controllers/userController')

// ROUTER MOUNTING

const router = express.Router();
router.route('/').get(userController.getAllUsers).post(userController.createUser);
router.route('/:id').get(userController.getUsers).patch(userController.updateUser).delete(userController.deleteUser);

module.exports = router;
