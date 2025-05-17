const Permission = require('../models/Permission');

class PermissionRepository {
    async findAll() {
        return Permission.getAll();
    }

    async findById(id) {
        return Permission.getById(id);
    }

    async findByName(name) {
        return Permission.getByName(name);
    }

    async create(data) {
        const { name, description } = data;
        return Permission.create(name, description);
    }

    async update(id, data) {
        return Permission.update(id, data);
    }

    async delete(id) {
        return Permission.delete(id);
    }

    async search(query) {
        return Permission.search(query);
    }
}

module.exports = new PermissionRepository();
