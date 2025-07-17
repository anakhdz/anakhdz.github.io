const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./db.sqlite');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create table if it doesn't exist
db.run(`CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  submitted_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// Handle form submissions
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  db.run('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    function (err) {
      if (err) {
        return res.status(500).send('Error saving message');
      }
      res.json({ success: true });
    }
  );
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
