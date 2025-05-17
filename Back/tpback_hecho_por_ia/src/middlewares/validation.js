const { body } = require('express-validator');

const permissionValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('description')
        .trim()
        .isLength({ max: 255 }).withMessage('La descripción no puede tener más de 255 caracteres')
];

const roleValidation = [
    body('name')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres'),
    body('description')
        .trim()
        .isLength({ max: 255 }).withMessage('La descripción no puede tener más de 255 caracteres')
];

const userValidation = [
    body('username')
        .trim()
        .notEmpty().withMessage('El nombre de usuario es obligatorio')
        .isLength({ min: 3, max: 50 }).withMessage('El nombre de usuario debe tener entre 3 y 50 caracteres'),
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('email')
        .trim()
        .notEmpty().withMessage('El email es obligatorio')
        .isEmail().withMessage('El email debe ser válido'),
    body('rolId')
        .notEmpty().withMessage('El rol es obligatorio')
        .isInt().withMessage('El rol debe ser un número entero')
];

module.exports = {
    permissionValidation,
    roleValidation,
    userValidation
};
