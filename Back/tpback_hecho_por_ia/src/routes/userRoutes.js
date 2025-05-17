const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { checkPermission } = require('../middlewares/accessControl');

// GET /users - List all users
router.get('/', checkPermission('view_user'), userController.index);

// GET /users/:id - Show a user details with their permissions
router.get('/:id', checkPermission('view_user'), userController.show);

module.exports = router;
