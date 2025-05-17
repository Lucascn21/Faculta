const { db } = require('../database/init');

class Permission {
    static getAll() {
        return db.prepare('SELECT * FROM permissions ORDER BY id').all();
    }

    static getById(id) {
        return db.prepare('SELECT * FROM permissions WHERE id = ?').get(id);
    }

    static getByName(name) {
        return db.prepare('SELECT * FROM permissions WHERE name = ?').get(name);
    }

    static create(name, description = '') {
        const stmt = db.prepare('INSERT INTO permissions (name, description) VALUES (?, ?)');
        const result = stmt.run(name, description);
        return result.lastInsertRowid;
    }

    static update(id, { name, description }) {
        const stmt = db.prepare('UPDATE permissions SET name = ?, description = ? WHERE id = ?');
        return stmt.run(name, description, id);
    }

    static delete(id) {
        const stmt = db.prepare('DELETE FROM permissions WHERE id = ?');
        return stmt.run(id);
    }

    static search(query) {
        return db.prepare('SELECT * FROM permissions WHERE name LIKE ? ORDER BY id')
            .all(`%${query}%`);
    }
}

module.exports = Permission;
