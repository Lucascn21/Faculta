const Database = require('better-sqlite3');
const path = require('path');
const chalk = require('chalk');

const db = new Database(path.join(__dirname, 'database.sqlite'), { verbose: console.log });

const initDatabase = () => {
    try {
        // Create users table
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                email TEXT UNIQUE,
                rol_id INTEGER NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (rol_id) REFERENCES roles(id)
            )
        `);

        // Create roles table
        db.exec(`
            CREATE TABLE IF NOT EXISTS roles (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                description TEXT
            )
        `);

        // Create permissions table
        db.exec(`
            CREATE TABLE IF NOT EXISTS permissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                description TEXT
            )
        `);

        // Create role_permission table (many-to-many relationship)
        db.exec(`
            CREATE TABLE IF NOT EXISTS role_permission (
                role_id INTEGER NOT NULL,
                permission_id INTEGER NOT NULL,
                PRIMARY KEY (role_id, permission_id),
                FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
                FOREIGN KEY (permission_id) REFERENCES permissions(id) ON DELETE CASCADE
            )
        `);

        // Check if we need to add default data
        const roleCount = db.prepare('SELECT COUNT(*) as count FROM roles').get().count;
        
        if (roleCount === 0) {
            // Add default roles
            const insertRole = db.prepare('INSERT INTO roles (name, description) VALUES (?, ?)');
            insertRole.run('admin', 'Administrador con acceso completo');
            insertRole.run('user', 'Usuario con acceso limitado');
            
            // Add default permissions
            const insertPermission = db.prepare('INSERT INTO permissions (name, description) VALUES (?, ?)');
            insertPermission.run('create_user', 'Crear usuarios');
            insertPermission.run('edit_user', 'Editar usuarios');
            insertPermission.run('delete_user', 'Eliminar usuarios');
            insertPermission.run('view_user', 'Ver usuarios');
            insertPermission.run('create_role', 'Crear roles');
            insertPermission.run('edit_role', 'Editar roles');
            insertPermission.run('delete_role', 'Eliminar roles');
            insertPermission.run('view_role', 'Ver roles');
            insertPermission.run('create_permission', 'Crear permisos');
            insertPermission.run('edit_permission', 'Editar permisos');
            insertPermission.run('delete_permission', 'Eliminar permisos');
            insertPermission.run('view_permission', 'Ver permisos');
            
            // Assign all permissions to admin role
            const adminRoleId = db.prepare('SELECT id FROM roles WHERE name = ?').get('admin').id;
            const permissions = db.prepare('SELECT id FROM permissions').all();
            
            const insertRolePermission = db.prepare('INSERT INTO role_permission (role_id, permission_id) VALUES (?, ?)');
            permissions.forEach(permission => {
                insertRolePermission.run(adminRoleId, permission.id);
            });
            
            // Assign view permissions to user role
            const userRoleId = db.prepare('SELECT id FROM roles WHERE name = ?').get('user').id;
            const viewPermissions = db.prepare('SELECT id FROM permissions WHERE name LIKE ?').all('view_%');
            
            viewPermissions.forEach(permission => {
                insertRolePermission.run(userRoleId, permission.id);
            });
            
            // Add a default admin user (username: admin, password: admin123)
            db.prepare('INSERT INTO users (username, password, email, rol_id) VALUES (?, ?, ?, ?)')
              .run('admin', 'admin123', 'admin@example.com', adminRoleId);
        }

        console.log(chalk.green('✓ Base de datos inicializada correctamente'));
    } catch (error) {
        console.error(chalk.red('✗ Error al inicializar la base de datos:'), error.message);
        process.exit(1);
    }
};

module.exports = {
    db,
    initDatabase
};
