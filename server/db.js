const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.resolve(__dirname, "leaderboard.db");
const db = new sqlite3.Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE,
    wins INTEGER DEFAULT 0
  )
`);

const getUserByName = (name) => {
  return new Promise((resolve, reject) => {
    db.get("SELECT * FROM users WHERE name = ?", [name], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};

const addUser = (name) => {
  return new Promise((resolve, reject) => {
    const stmt = db.prepare("INSERT OR IGNORE INTO users (name) VALUES (?)");
    stmt.run(name, function (err) {
      if (err) return reject(err);
      resolve(this.lastID);
    });
  });
};

const getLeaderboard = () => {
  return new Promise((resolve, reject) => {
    db.all(
      "SELECT name, wins FROM users ORDER BY wins DESC",
      [],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
};

const updateWinCount = (name) => {
  return new Promise((resolve, reject) => {
    db.run(
      "UPDATE users SET wins = wins + 1 WHERE name = ?",
      [name],
      function (err) {
        if (err) return reject(err);
        resolve();
      }
    );
  });
};

module.exports = { getUserByName, addUser, getLeaderboard, updateWinCount };
