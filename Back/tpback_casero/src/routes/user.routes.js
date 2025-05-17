const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');

// Ruta para la página principal de usuarios
router.get("/", userController.renderUsersPage);

// Ruta para probar errores - ahora con una ruta más específica
router.get("/error", userController.testError);
router.get("/error/:type", userController.testError);

// Ruta para obtener un usuario por ID (para futuras implementaciones)
router.get("/:id", userController.getUserById);

module.exports = router;
