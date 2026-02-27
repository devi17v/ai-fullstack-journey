//importing the Express library.
const express = require('express');

//Creating a Router instance.
const router = express.Router();
const userController = require('../controller/userController');

//Calls function inside userController
router.get('/', userController.getUsers); 
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;