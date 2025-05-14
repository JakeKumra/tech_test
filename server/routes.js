const express = require("express");
const db = require("./db");

const router = express.Router();

router.post("/users", async (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ message: "Name is required" });

  try {
    const userId = await db.addUser(name);
    res.json({ id: userId, name });
  } catch (err) {
    res.status(500).json({ message: "Error adding user" });
  }
});

router.get("/leaderboard", async (req, res) => {
  try {
    const leaderboard = await db.getLeaderboard();
    res.json(leaderboard);
  } catch (err) {
    res.status(500).json({ message: "Error fetching leaderboard" });
  }
});

router.post("/users/:name/win", async (req, res) => {
  const { name } = req.params;

  try {
    await db.updateWinCount(name);
    res.json({ message: "Win recorded" });
  } catch (err) {
    res.status(500).json({ message: "Error updating win count" });
  }
});

module.exports = router;
