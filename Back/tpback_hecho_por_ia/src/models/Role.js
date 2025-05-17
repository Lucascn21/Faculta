const { db } = require('../database/init');

class Role {
    static getAll() {
        return db.prepare('SELECT * FROM roles ORDER BY id').all();
    }

    static getById(id) {
        return db.prepare('SELECT * FROM roles WHERE id = ?').get(id);
    }

    static create(name, description = '') {
        const stmt = db.prepare('INSERT INTO roles (name, description) VALUES (?, ?)');
        const result = stmt.run(name, description);
        return result.lastInsertRowid;
    }

    static update(id, { name, description }) {
        const stmt = db.prepare('UPDATE roles SET name = ?, description = ? WHERE id = ?');
        return stmt.run(name, description, id);
    }    static delete(id) {
        // First, remove all role_permission entries for this role
        db.prepare('DELETE FROM role_permission WHERE role_id = ?').run(id);
        
        // Then, delete the role
        const stmt = db.prepare('DELETE FROM roles WHERE id = ?');
        return stmt.run(id);
    }

    static getPermissions(roleId) {
        return db.prepare(`
            SELECT p.* FROM permissions p
            JOIN role_permission rp ON p.id = rp.permission_id
            WHERE rp.role_id = ?
            ORDER BY p.id
        `).all(roleId);
    }

    static setPermissions(roleId, permissionIds) {
        const deleteStmt = db.prepare('DELETE FROM role_permission WHERE role_id = ?');
        const insertStmt = db.prepare('INSERT INTO role_permission (role_id, permission_id) VALUES (?, ?)');
        
        // Use a transaction to ensure atomicity
        const transaction = db.transaction((roleId, permissionIds) => {
            deleteStmt.run(roleId);
            
            for (const permissionId of permissionIds) {
                insertStmt.run(roleId, permissionId);
            }
        });
        
        transaction(roleId, permissionIds);
        return true;
    }

    static search(query) {
        return db.prepare('SELECT * FROM roles WHERE name LIKE ? ORDER BY id')
            .all(`%${query}%`);
    }
}

module.exports = Role;
