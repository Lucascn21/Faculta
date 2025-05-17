const roleRepository = require('../repositories/roleRepository');
const permissionRepository = require('../repositories/permissionRepository');

class RoleService {
    async getAllRoles() {
        return await roleRepository.findAll();
    }

    async getRoleById(id) {
        return await roleRepository.findById(id);
    }

    async createRole(roleData) {
        return await roleRepository.create(roleData);
    }

    async updateRole(id, roleData) {
        // Check if role exists
        const role = await roleRepository.findById(id);
        if (!role) {
            throw new Error('Rol no encontrado');
        }

        return await roleRepository.update(id, roleData);
    }

    async deleteRole(id) {
        // Check if role exists
        const role = await roleRepository.findById(id);
        if (!role) {
            throw new Error('Rol no encontrado');
        }

        return await roleRepository.delete(id);
    }

    async getRolePermissions(roleId) {
        // Check if role exists
        const role = await roleRepository.findById(roleId);
        if (!role) {
            throw new Error('Rol no encontrado');
        }

        return await roleRepository.getPermissions(roleId);
    }

    async updateRolePermissions(roleId, permissionIds) {
        // Check if role exists
        const role = await roleRepository.findById(roleId);
        if (!role) {
            throw new Error('Rol no encontrado');
        }

        // Validate all permission IDs exist
        const allPermissions = await permissionRepository.findAll();
        const validPermissionIds = allPermissions.map(p => p.id);
        
        for (const permId of permissionIds) {
            if (!validPermissionIds.includes(Number(permId))) {
                throw new Error(`Permiso con ID ${permId} no existe`);
            }
        }

        return await roleRepository.setPermissions(roleId, permissionIds);
    }
}

module.exports = new RoleService();
