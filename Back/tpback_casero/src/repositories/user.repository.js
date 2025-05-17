const Database = require('better-sqlite3');
const path = require('path');

// Ruta a la base de datos SQLite
const dbPath = path.resolve(__dirname, '../../database/users.db');
const db = new Database(dbPath, { verbose: console.log });

// Crear tabla de usuarios si no existe
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    faction TEXT NOT NULL
  );
`);

const getAllUsers = () => {
  const stmt = db.prepare('SELECT * FROM users');
  return stmt.all();
};

const getUserById = (id) => {
  const stmt = db.prepare('SELECT * FROM users WHERE id = ?');
  return stmt.get(id);
};

const addUser = (user) => {
  const stmt = db.prepare('INSERT INTO users (name, email, faction) VALUES (?, ?, ?)');
  const result = stmt.run(user.name, user.email, user.faction);
  return { id: result.lastInsertRowid, ...user };
};

const updateUser = (id, user) => {
  const stmt = db.prepare('UPDATE users SET name = ?, email = ?, faction = ? WHERE id = ?');
  const result = stmt.run(user.name, user.email, user.faction, id);
  return result.changes > 0;
};

const deleteUser = (id) => {
  const stmt = db.prepare('DELETE FROM users WHERE id = ?');
  const result = stmt.run(id);
  return result.changes > 0;
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
};