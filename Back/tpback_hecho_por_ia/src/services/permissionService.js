const permissionRepository = require('../repositories/permissionRepository');

class PermissionService {
    async getAllPermissions() {
        return await permissionRepository.findAll();
    }

    async getPermissionById(id) {
        return await permissionRepository.findById(id);
    }

    async createPermission(permissionData) {
        // Check if a permission with the same name already exists
        const existingPermission = await permissionRepository.findByName(permissionData.name);
        if (existingPermission) {
            throw new Error('Ya existe un permiso con ese nombre');
        }

        return await permissionRepository.create(permissionData);
    }

    async updatePermission(id, permissionData) {
        // Check if permission exists
        const permission = await permissionRepository.findById(id);
        if (!permission) {
            throw new Error('Permiso no encontrado');
        }

        // Check if name is being changed and if it already exists
        if (permissionData.name !== permission.name) {
            const existingPermission = await permissionRepository.findByName(permissionData.name);
            if (existingPermission) {
                throw new Error('Ya existe un permiso con ese nombre');
            }
        }

        return await permissionRepository.update(id, permissionData);
    }

    async deletePermission(id) {
        // Check if permission exists
        const permission = await permissionRepository.findById(id);
        if (!permission) {
            throw new Error('Permiso no encontrado');
        }

        return await permissionRepository.delete(id);
    }

    async searchPermissions(query) {
        if (!query) {
            return await permissionRepository.findAll();
        }
        return await permissionRepository.search(query);
    }
}

module.exports = new PermissionService();
