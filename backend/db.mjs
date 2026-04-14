import fs from 'node:fs';
import path from 'node:path';
import sqlite3 from 'sqlite3';
import bcrypt from 'bcryptjs';

const sqlite = sqlite3.verbose();
const dataDir = path.join(process.cwd(), 'backend', 'data');
const dbPath = path.join(dataDir, 'app.db');

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new sqlite.Database(dbPath);

function run(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function onRun(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(this);
    });
  });
}

function get(sql, params = []) {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(row);
    });
  });
}

async function initializeDatabase() {
  await run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'user'))
    )
  `);

  const defaultUsers = [
    { username: 'admin', password: 'admin', role: 'admin' },
    { username: 'user', password: 'user', role: 'user' },
  ];

  for (const account of defaultUsers) {
    const existingUser = await get('SELECT id FROM users WHERE username = ?', [account.username]);
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(account.password, 10);
      await run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
        account.username,
        hashedPassword,
        account.role,
      ]);
    }
  }
}

export { get, run, initializeDatabase };
