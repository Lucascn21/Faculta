
/**
 * Constantes relacionadas con usuarios
 */

// Mensajes de información sobre usuarios
const USER_INFO_MESSAGES = {
  FETCHED_ALL: 'Usuarios recuperados exitosamente',
  FETCHED_ONE: 'Usuario recuperado exitosamente',
  CREATED: 'Usuario creado exitosamente',
  UPDATED: 'Usuario actualizado exitosamente',
  DELETED: 'Usuario eliminado exitosamente'
};

// Mensajes de error relacionados con usuarios
const USER_ERROR_MESSAGES = {
  NOT_FOUND: 'Usuario no encontrado',
  INVALID_DATA: 'Datos de usuario inválidos',
  ALREADY_EXISTS: 'El usuario ya existe',
  CREATE_FAILED: 'Error al crear el usuario',
  UPDATE_FAILED: 'Error al actualizar el usuario',
  DELETE_FAILED: 'Error al eliminar el usuario',
  INTERNAL_SERVER_ERROR: 'Error interno del servidor'
};

// Constantes de validación
const USER_VALIDATION = {
  NAME_MIN_LENGTH: 3,
  NAME_MAX_LENGTH: 50,
  PASSWORD_MIN_LENGTH: 8
};

module.exports = {
  USER_INFO_MESSAGES,
  USER_ERROR_MESSAGES,
  USER_VALIDATION
};
