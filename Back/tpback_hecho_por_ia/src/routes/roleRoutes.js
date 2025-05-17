const express = require('express');
const router = express.Router();
const roleController = require('../controllers/roleController');
const { roleValidation } = require('../middlewares/validation');
const { checkPermission } = require('../middlewares/accessControl');

// GET /roles - List all roles
router.get('/', roleController.index);

// GET /roles/create - Show create form
router.get('/create', checkPermission('create_role'), roleController.create);

// POST /roles - Create a new role
router.post('/', checkPermission('create_role'), roleValidation, roleController.store);

// GET /roles/:id - Show a role details
router.get('/:id', roleController.show);

// GET /roles/:id/edit - Show edit form
router.get('/:id/edit', checkPermission('edit_role'), roleController.edit);

// GET /roles/:id/permissions - Show permissions assignment form
router.get('/:id/permissions', checkPermission('edit_role'), roleController.editPermissions);

// PUT /roles/:id - Update a role
router.put('/:id', checkPermission('edit_role'), roleValidation, roleController.update);

// PUT /roles/:id/permissions - Update role permissions
router.put('/:id/permissions', checkPermission('edit_role'), roleController.updatePermissions);

// DELETE /roles/:id - Delete a role
router.delete('/:id', checkPermission('delete_role'), roleController.destroy);

module.exports = router;
