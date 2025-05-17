const roleService = require('../services/roleService');
const permissionService = require('../services/permissionService');
const { validationResult } = require('express-validator');

class RoleController {
    // GET /roles
    async index(req, res) {
        try {
            const roles = await roleService.getAllRoles();
            res.render('roles/index', { 
                title: 'Listado de Roles',
                roles
            });
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect('/');
        }
    }

    // GET /roles/create
    create(req, res) {
        res.render('roles/create', { 
            title: 'Crear Nuevo Rol',
            role: { name: '', description: '' }
        });
    }

    // POST /roles
    async store(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('roles/create', {
                    title: 'Crear Nuevo Rol',
                    role: req.body,
                    errors: errors.array()
                });
            }

            await roleService.createRole(req.body);
            req.flash('success', 'Rol creado exitosamente');
            res.redirect('/roles');
        } catch (error) {
            res.render('roles/create', {
                title: 'Crear Nuevo Rol',
                role: req.body,
                error: error.message
            });
        }
    }

    // GET /roles/:id
    async show(req, res) {
        try {
            const id = req.params.id;
            const role = await roleService.getRoleById(id);
            
            if (!role) {
                req.flash('error', 'Rol no encontrado');
                return res.redirect('/roles');
            }

            const permissions = await roleService.getRolePermissions(id);
            
            res.render('roles/show', {
                title: `Rol: ${role.name}`,
                role,
                permissions
            });
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect('/roles');
        }
    }

    // GET /roles/:id/edit
    async edit(req, res) {
        try {
            const id = req.params.id;
            const role = await roleService.getRoleById(id);
            
            if (!role) {
                req.flash('error', 'Rol no encontrado');
                return res.redirect('/roles');
            }

            res.render('roles/edit', {
                title: 'Editar Rol',
                role
            });
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect('/roles');
        }
    }

    // GET /roles/:id/permissions
    async editPermissions(req, res) {
        try {
            const id = req.params.id;
            const role = await roleService.getRoleById(id);
            
            if (!role) {
                req.flash('error', 'Rol no encontrado');
                return res.redirect('/roles');
            }

            const allPermissions = await permissionService.getAllPermissions();
            const rolePermissions = await roleService.getRolePermissions(id);
            const rolePermissionIds = rolePermissions.map(p => p.id);
            
            // Add a checked property to each permission
            const permissions = allPermissions.map(p => ({
                ...p,
                checked: rolePermissionIds.includes(p.id)
            }));
            
            res.render('roles/permissions', {
                title: `Asignar Permisos a Rol: ${role.name}`,
                role,
                permissions
            });
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect('/roles');
        }
    }

    // PUT /roles/:id
    async update(req, res) {
        try {
            const id = req.params.id;
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                return res.render('roles/edit', {
                    title: 'Editar Rol',
                    role: { ...req.body, id },
                    errors: errors.array()
                });
            }

            await roleService.updateRole(id, req.body);
            req.flash('success', 'Rol actualizado exitosamente');
            res.redirect('/roles');
        } catch (error) {
            res.render('roles/edit', {
                title: 'Editar Rol',
                role: { ...req.body, id: req.params.id },
                error: error.message
            });
        }
    }

    // PUT /roles/:id/permissions
    async updatePermissions(req, res) {
        try {
            const id = req.params.id;
            const role = await roleService.getRoleById(id);
            
            if (!role) {
                req.flash('error', 'Rol no encontrado');
                return res.redirect('/roles');
            }

            // req.body.permissions can be a single value or an array of values
            const permissionIds = Array.isArray(req.body.permissions) 
                ? req.body.permissions 
                : req.body.permissions ? [req.body.permissions] : [];
            
            await roleService.updateRolePermissions(id, permissionIds);
            req.flash('success', 'Permisos actualizados exitosamente');
            res.redirect(`/roles/${id}`);
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect(`/roles/${req.params.id}/permissions`);
        }
    }

    // DELETE /roles/:id
    async destroy(req, res) {
        try {
            const id = req.params.id;
            await roleService.deleteRole(id);
            req.flash('success', 'Rol eliminado exitosamente');
            res.redirect('/roles');
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect('/roles');
        }
    }
}

module.exports = new RoleController();
