/**
 * Controlador de usuarios
 * Responsable de manejar las solicitudes HTTP y devolver respuestas
 */

const userService = require("../services/user.service");
const { HTTP_STATUS, HTTP_MESSAGES } = require("../constants/http.constants");
const {
  USER_INFO_MESSAGES,
  USER_ERROR_MESSAGES,
} = require("../constants/user.constants");

// Renderizar la página principal de usuarios con los datos
const renderUsersPage = (req, res, next) => {
  try {
    // Obtener usuarios del servicio
    const users = userService.getExampleUsers();

    // Renderizar la vista con los datos
    res.render("users", {
      users: users,
      title: "Administración de Usuarios del Imperio",
    });
  } catch (error) {
    console.error("Error al renderizar la página de usuarios:", error);
    error.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    next(error);
  }
};

// Función para probar errores
const testError = (req, res, next) => {
  try {
    // Si no hay parámetro type, usamos 'general' como valor predeterminado
    const errorType = req.params.type || 'general';
    
    // Simular diferentes tipos de errores
    switch(errorType) {
      case '404':
        const error404 = new Error('Recurso no encontrado');
        error404.statusCode = HTTP_STATUS.NOT_FOUND;
        throw error404;
      
      case 'validation':
        const errorValidation = new Error('Error de validación en los datos');
        errorValidation.statusCode = HTTP_STATUS.BAD_REQUEST;
        throw errorValidation;
      
      case 'auth':
        const errorAuth = new Error('No autorizado');
        errorAuth.statusCode = HTTP_STATUS.UNAUTHORIZED;
        throw errorAuth;
        
      default:
        throw new Error('Error interno del servidor');
    }
  } catch (error) {
    error.statusCode = error.statusCode || HTTP_STATUS.INTERNAL_SERVER_ERROR;
    next(error);
  }
};

// Obtener usuario por ID (para futuras implementaciones)
const getUserById = (req, res, next) => {
  try {
    const { id } = req.params;
    const user = userService.getUserById(id);

    if (!user) {
      const error = new Error(USER_ERROR_MESSAGES.NOT_FOUND);
      error.statusCode = HTTP_STATUS.NOT_FOUND;
      return next(error);
    }

    res.status(HTTP_STATUS.OK).json({
      message: USER_INFO_MESSAGES.FETCHED_ONE,
      data: user,
    });
  } catch (error) {
    console.error("Error al obtener usuario por ID:", error);
    error.statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
    next(error);
  }
};

// Exportar las funciones del controlador
module.exports = {
  renderUsersPage,
  getUserById,
  testError
};
