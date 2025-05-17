/**
 * Servicio de usuarios
 * Responsable de la lógica de negocio relacionada con los usuarios
 */

const userRepository = require('../repositories/user.repository');

const getExampleUsers = () => {
  return userRepository.getAllUsers();
};

const getUserById = (id) => {
  return userRepository.getUserById(id);
};

const addUser = (user) => {
  return userRepository.addUser(user);
};

const updateUser = (id, user) => {
  return userRepository.updateUser(id, user);
};

const deleteUser = (id) => {
  return userRepository.deleteUser(id);
};

module.exports = {
  getExampleUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};