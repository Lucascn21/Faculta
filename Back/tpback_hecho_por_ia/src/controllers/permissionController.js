const permissionService = require('../services/permissionService');
const { validationResult } = require('express-validator');

class PermissionController {
    // GET /permissions
    async index(req, res) {
        try {
            const query = req.query.search;
            const permissions = await permissionService.searchPermissions(query);
            res.render('permissions/index', { 
                title: 'Listado de Permisos',
                permissions,
                query
            });
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect('/');
        }
    }

    // GET /permissions/create
    create(req, res) {
        res.render('permissions/create', { 
            title: 'Crear Nuevo Permiso',
            permission: { name: '', description: '' }
        });
    }

    // POST /permissions
    async store(req, res) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.render('permissions/create', {
                    title: 'Crear Nuevo Permiso',
                    permission: req.body,
                    errors: errors.array()
                });
            }

            await permissionService.createPermission(req.body);
            req.flash('success', 'Permiso creado exitosamente');
            res.redirect('/permissions');
        } catch (error) {
            res.render('permissions/create', {
                title: 'Crear Nuevo Permiso',
                permission: req.body,
                error: error.message
            });
        }
    }

    // GET /permissions/:id/edit
    async edit(req, res) {
        try {
            const id = req.params.id;
            const permission = await permissionService.getPermissionById(id);
            
            if (!permission) {
                req.flash('error', 'Permiso no encontrado');
                return res.redirect('/permissions');
            }

            res.render('permissions/edit', {
                title: 'Editar Permiso',
                permission
            });
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect('/permissions');
        }
    }

    // PUT /permissions/:id
    async update(req, res) {
        try {
            const id = req.params.id;
            const errors = validationResult(req);
            
            if (!errors.isEmpty()) {
                return res.render('permissions/edit', {
                    title: 'Editar Permiso',
                    permission: { ...req.body, id },
                    errors: errors.array()
                });
            }

            await permissionService.updatePermission(id, req.body);
            req.flash('success', 'Permiso actualizado exitosamente');
            res.redirect('/permissions');
        } catch (error) {
            res.render('permissions/edit', {
                title: 'Editar Permiso',
                permission: { ...req.body, id: req.params.id },
                error: error.message
            });
        }
    }

    // DELETE /permissions/:id
    async destroy(req, res) {
        try {
            const id = req.params.id;
            await permissionService.deletePermission(id);
            req.flash('success', 'Permiso eliminado exitosamente');
            res.redirect('/permissions');
        } catch (error) {
            req.flash('error', `Error: ${error.message}`);
            res.redirect('/permissions');
        }
    }
}

module.exports = new PermissionController();
