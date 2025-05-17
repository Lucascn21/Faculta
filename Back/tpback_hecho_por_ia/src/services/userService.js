const userRepository = require('../repositories/userRepository');
const roleRepository = require('../repositories/roleRepository');

class UserService {
    async getAllUsers() {
        return await userRepository.findAll();
    }

    async getUserById(id) {
        return await userRepository.findById(id);
    }

    async createUser(userData) {
        // Check if role exists
        const role = await roleRepository.findById(userData.rolId);
        if (!role) {
            throw new Error('Rol no encontrado');
        }

        return await userRepository.create(userData);
    }

    async updateUser(id, userData) {
        // Check if user exists
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        // Check if role exists
        if (userData.rolId) {
            const role = await roleRepository.findById(userData.rolId);
            if (!role) {
                throw new Error('Rol no encontrado');
            }
        }

        return await userRepository.update(id, userData);
    }

    async deleteUser(id) {
        // Check if user exists
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return await userRepository.delete(id);
    }

    async getUserPermissions(id) {
        // Check if user exists
        const user = await userRepository.findById(id);
        if (!user) {
            throw new Error('Usuario no encontrado');
        }

        return await userRepository.getPermissions(id);
    }
}

module.exports = new UserService();
