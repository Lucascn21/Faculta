const userService = require('../services/userService');

/**
 * Middleware to check if a user has a specific permission
 * @param {string} requiredPermission - The name of the permission to check
 * @returns {function} - Express middleware
 */
const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        // In a real app, you would get the user ID from the session after login
        // For this exercise, we'll use a stub user ID (the admin user)
        const userId = 1; // Hard-coded admin user ID for demo purposes
        
        try {
            // Get all permissions for the user
            const permissions = await userService.getUserPermissions(userId);
            
            // Check if the user has the required permission
            const hasPermission = permissions.some(p => p.name === requiredPermission);
            
            if (hasPermission) {
                next();
            } else {
                res.status(403).render('error', {
                    title: 'Acceso Denegado',
                    message: 'No tienes permiso para acceder a este recurso',
                    statusCode: 403
                });
            }
        } catch (error) {
            res.status(500).render('error', {
                title: 'Error',
                message: 'Error al verificar permisos',
                statusCode: 500
            });
        }
    };
};

module.exports = {
    checkPermission
};
