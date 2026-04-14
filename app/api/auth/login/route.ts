import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password, oauth } = body;

    // Handle OAuth mock
    if (oauth === 'google') {
      const token = jwt.sign({ username: 'GoogleUser', role: 'user' }, JWT_SECRET, { expiresIn: '1d' });
      return NextResponse.json({ message: 'OAuth login successful', token }, { status: 200 });
    }

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const usersData = JSON.parse(await fs.readFile(USERS_FILE, 'utf-8'));
    const user = usersData.find((u: { username: string; [key: string]: unknown }) => u.username === username);

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: user.id, username: user.username, role: 'user' }, JWT_SECRET, { expiresIn: '1d' });

    return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
  } catch (error) {
    console.error('Login error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
