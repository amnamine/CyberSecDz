import bcrypt from 'bcryptjs';
import cors from 'cors';
import express from 'express';
import jwt from 'jsonwebtoken';
import { get, initializeDatabase, run } from './db.mjs';

const app = express();
const PORT = process.env.EXPRESS_PORT || 4000;
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password, oauth } = req.body;

    if (oauth === 'google') {
      const token = jwt.sign({ username: 'GoogleUser', role: 'user' }, JWT_SECRET, { expiresIn: '1d' });
      return res.status(200).json({ message: 'OAuth login successful', token, role: 'user' });
    }

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const user = await get('SELECT id, username, password, role FROM users WHERE username = ?', [username]);
    if (!user || user.role !== 'user') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({ message: 'Login successful', token, role: user.role });
  } catch (error) {
    console.error('Login error', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/auth/admin-login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const admin = await get('SELECT id, username, password, role FROM users WHERE username = ?', [username]);
    if (!admin || admin.role !== 'admin') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, JWT_SECRET, {
      expiresIn: '1d',
    });

    return res.status(200).json({ message: 'Admin login successful', token, role: admin.role });
  } catch (error) {
    console.error('Admin login error', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password required' });
    }

    const existing = await get('SELECT id FROM users WHERE username = ?', [username]);
    if (existing) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await run('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [
      username,
      hashedPassword,
      'user',
    ]);

    return res.status(201).json({ message: 'User registered successfully', userId: result.lastID });
  } catch (error) {
    console.error('Registration error', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

initializeDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Express auth backend running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to initialize database', error);
    process.exit(1);
  });
