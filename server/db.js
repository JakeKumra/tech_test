const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'leaderboard.db');
const db = new sqlite3.Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    wins INTEGER DEFAULT 0
  )
`);

const getUserByName = (name, callback) => {
  db.get('SELECT * FROM users WHERE name = ?', [name], callback);
};

const addUser = (name, callback) => {
  const stmt = db.prepare('INSERT OR IGNORE INTO users (name) VALUES (?)');
  stmt.run(name, function (err) {
    callback(err, this.lastID);
  });
};

const getLeaderboard = (callback) => {
  db.all('SELECT name, wins FROM users ORDER BY wins DESC', [], callback);
};

const updateWinCount = (name, callback) => {
  db.run('UPDATE users SET wins = wins + 1 WHERE name = ?', [name], callback);
};

module.exports = { getUserByName, addUser, getLeaderboard, updateWinCount };
