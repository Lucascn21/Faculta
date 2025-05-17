const Role = require('../models/Role');

class RoleRepository {
    async findAll() {
        return Role.getAll();
    }

    async findById(id) {
        return Role.getById(id);
    }

    async create(data) {
        const { name, description } = data;
        return Role.create(name, description);
    }

    async update(id, data) {
        return Role.update(id, data);
    }

    async delete(id) {
        return Role.delete(id);
    }

    async getPermissions(roleId) {
        return Role.getPermissions(roleId);
    }

    async setPermissions(roleId, permissionIds) {
        return Role.setPermissions(roleId, permissionIds);
    }
}

module.exports = new RoleRepository();
