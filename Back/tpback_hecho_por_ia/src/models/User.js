const { db } = require('../database/init');

class User {
    static getAll() {
        return db.prepare(`
            SELECT u.*, r.name as role_name 
            FROM users u
            JOIN roles r ON u.rol_id = r.id
            ORDER BY u.id
        `).all();
    }

    static getById(id) {
        return db.prepare(`
            SELECT u.*, r.name as role_name 
            FROM users u
            JOIN roles r ON u.rol_id = r.id
            WHERE u.id = ?
        `).get(id);
    }

    static create(username, password, email, rolId) {
        const stmt = db.prepare(
            'INSERT INTO users (username, password, email, rol_id) VALUES (?, ?, ?, ?)'
        );
        const result = stmt.run(username, password, email, rolId);
        return result.lastInsertRowid;
    }

    static update(id, { username, password, email, rolId }) {
        const stmt = db.prepare(
            'UPDATE users SET username = ?, password = ?, email = ?, rol_id = ? WHERE id = ?'
        );
        return stmt.run(username, password, email, rolId, id);
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM users WHERE id = ?');
        return stmt.run(id);
    }

    static getPermissions(userId) {
        return db.prepare(`
            SELECT p.* FROM permissions p
            JOIN role_permission rp ON p.id = rp.permission_id
            JOIN users u ON rp.role_id = u.rol_id
            WHERE u.id = ?
            ORDER BY p.id
        `).all(userId);
    }
}

module.exports = User;
