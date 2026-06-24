const router = require('express').Router();
const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET = 'change-this-secret';

function auth(req, res, next) {
  const token = (req.headers.authorization || '').replace('Bearer ', '');
  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Please log in' });
  }
}

router.post('/', auth, (req, res) => {
  const { items, total } = req.body; // items = [{id, name, qty, price}]
  const info = db.prepare(
    'INSERT INTO orders (user_id, items, total, created_at) VALUES (?,?,?,?)'
  ).run(req.user.id, JSON.stringify(items), total, new Date().toISOString());
  res.json({ orderId: info.lastInsertRowid, message: 'Order placed!' });
});

router.get('/', auth, (req, res) => {
  const orders = db.prepare('SELECT * FROM orders WHERE user_id = ?').all(req.user.id);
  res.json(orders.map(o => ({ ...o, items: JSON.parse(o.items) })));
});

module.exports = router;
