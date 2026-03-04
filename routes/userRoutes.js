const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const validateId = require('../middleware/validateId');
const { protect, authorize } = require("../middleware/authMiddleware");

//Protect ALL routes below
router.use(protect);

//GET all users - Admin only
router.get("/", authorize("admin"), userController.getUsers);

//GET single user - Logged in user
router.get("/:id", validateId, userController.getUserById);

//CREATE user - Admin only
router.post("/", authorize("admin"), userController.createUser);

//UPDATE user
router.put("/:id", validateId, userController.updateUser);
router.patch("/:id", validateId, userController.updateUser);

//DELETE user - Admin only
router.delete("/:id", validateId, authorize("admin"), userController.deleteUser);

module.exports = router;