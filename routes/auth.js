const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');
const SECRET = 'change-this-secret';

router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields required' });
  try {
    const hash = bcrypt.hashSync(password, 10);
    const info = db.prepare(
      'INSERT INTO users (name, email, password) VALUES (?,?,?)'
    ).run(name, email, hash);
    const token = jwt.sign({ id: info.lastInsertRowid }, SECRET);
    res.json({ token, name });
  } catch (e) {
    res.status(400).json({ error: 'Email already registered' });
  }
});

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password))
    return res.status(401).json({ error: 'Invalid credentials' });
  const token = jwt.sign({ id: user.id }, SECRET);
  res.json({ token, name: user.name });
});

module.exports = router;
