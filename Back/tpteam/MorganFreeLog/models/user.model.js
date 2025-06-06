const db = require("../database");

const UserModel = {
  getUserById: (id) => {
    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    return stmt.get(id);
  },
  getAllUsers: () => {
    const stmt = db.prepare("SELECT * FROM users");
    return stmt.all();
  },
  createUser: (name, email, password, rol_id) => {
    const stmt = db.prepare(
      "INSERT INTO users (name, email, password, rol_id) VALUES (?, ?, ?, ?)"
    );
    return stmt.run(name, email, password, rol_id);
  },
  updateUser: (id, name, email) => {
    const stmt = db.prepare(
      "UPDATE users SET name = ?, email = ? WHERE id = ?"
    );
    return stmt.run(name, email, id);
  },
  deleteUser: (id) => {
    const stmt = db.prepare("DELETE FROM users WHERE id = ?");
    return stmt.run(id);
  },
  getUserWithRole: (id) => {
    const stmt = db.prepare(`
            SELECT u.*, r.nombre as rol_nombre 
            FROM users u
            LEFT JOIN roles r ON u.rol_id = r.id
            WHERE u.id = ?
        `);
    return stmt.get(id);
  },

  getUserByEmail: (email) => {
    const stmt = db.prepare("SELECT * FROM users WHERE email = ?");
    return stmt.get(email);
  },
};

const checkColumn = db.prepare(`PRAGMA table_info(users)`).all();
const roleIdExists = checkColumn.some((col) => col.name === "rol_id");

if (!roleIdExists) {
  db.prepare(
    `ALTER TABLE users ADD COLUMN rol_id INTEGER REFERENCES roles(id)`
  ).run();

  db.prepare(`UPDATE users SET rol_id = 2 WHERE rol_id IS NULL`).run();
}

module.exports = UserModel;
