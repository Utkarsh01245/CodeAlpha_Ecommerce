const Database = require('better-sqlite3');
const db = new Database('store.db');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, email TEXT UNIQUE, password TEXT
  );
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT, description TEXT, price REAL, image TEXT, stock INTEGER
  );
  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER, items TEXT, total REAL, created_at TEXT
  );
`);

// Seed some products if empty
const count = db.prepare('SELECT COUNT(*) AS c FROM products').get().c;
if (count === 0) {
  const insert = db.prepare(
    'INSERT INTO products (name, description, price, image, stock) VALUES (?,?,?,?,?)'
  );
  insert.run('Wireless Headphones', 'Noise-cancelling over-ear', 99.99, '🎧', 20);
  insert.run('Mechanical Keyboard', 'RGB hot-swappable', 79.99, '⌨️', 15);
  insert.run('USB-C Hub', '7-in-1 adapter', 39.99, '🔌', 30);
}
module.exports = db;
