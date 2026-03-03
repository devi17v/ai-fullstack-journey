//importing the Express library.
const express = require('express');

//Creating a Router instance.
const router = express.Router();
const userController = require('../controller/userController');
const validateId = require('../middleware/validateId');

//Calls function inside userController
router.get('/', userController.getUsers); 
router.get('/:id', validateId, userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', validateId, userController.updateUser);
router.patch('/:id', validateId, userController.updateUser);
router.delete('/:id', validateId, userController.deleteUser);

module.exports = router;