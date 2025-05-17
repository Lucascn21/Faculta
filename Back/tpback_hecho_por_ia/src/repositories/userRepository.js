const User = require('../models/User');

class UserRepository {
    async findAll() {
        return User.getAll();
    }

    async findById(id) {
        return User.getById(id);
    }

    async create(data) {
        const { username, password, email, rolId } = data;
        return User.create(username, password, email, rolId);
    }

    async update(id, data) {
        return User.update(id, data);
    }

    async delete(id) {
        return User.delete(id);
    }

    async getPermissions(userId) {
        return User.getPermissions(userId);
    }
}

module.exports = new UserRepository();
