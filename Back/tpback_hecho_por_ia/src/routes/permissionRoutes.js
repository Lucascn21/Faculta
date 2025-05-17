const express = require('express');
const router = express.Router();
const permissionController = require('../controllers/permissionController');
const { permissionValidation } = require('../middlewares/validation');
const { checkPermission } = require('../middlewares/accessControl');

// GET /permissions - List all permissions
router.get('/', permissionController.index);

// GET /permissions/create - Show create form
router.get('/create', checkPermission('create_permission'), permissionController.create);

// POST /permissions - Create a new permission
router.post('/', checkPermission('create_permission'), permissionValidation, permissionController.store);

// GET /permissions/:id/edit - Show edit form
router.get('/:id/edit', checkPermission('edit_permission'), permissionController.edit);

// PUT /permissions/:id - Update a permission
router.put('/:id', checkPermission('edit_permission'), permissionValidation, permissionController.update);

// DELETE /permissions/:id - Delete a permission
router.delete('/:id', checkPermission('delete_permission'), permissionController.destroy);

module.exports = router;
