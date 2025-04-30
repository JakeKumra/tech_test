const express = require('express');
const db = require('./db');

const router = express.Router();

router.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: 'Name is required' });

  db.addUser(name, (err, userId) => {
    if (err) return res.status(500).json({ message: 'Error adding user' });
    res.json({ id: userId, name });
  });
});

router.get('/leaderboard', (req, res) => {
  db.getLeaderboard((err, rows) => {
    if (err) return res.status(500).json({ message: 'Error fetching leaderboard' });
    res.json(rows);
  });
});

router.post('/users/:name/win', (req, res) => {
  const { name } = req.params;

  db.updateWinCount(name, (err) => {
    if (err) return res.status(500).json({ message: 'Error updating win count' });
    res.json({ message: 'Win recorded' });
  });
});

module.exports = router;
