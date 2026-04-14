import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ADMINS_FILE = path.join(process.cwd(), 'data/admins.json');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key_for_dev_only';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const adminsData = JSON.parse(await fs.readFile(ADMINS_FILE, 'utf-8'));
    const admin = adminsData.find((a: { username: string; [key: string]: unknown }) => a.username === username);

    if (!admin) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const token = jwt.sign({ id: admin.id, username: admin.username, role: admin.role }, JWT_SECRET, { expiresIn: '1d' });

    return NextResponse.json({ message: 'Admin login successful', token, role: admin.role }, { status: 200 });
  } catch (error) {
    console.error('Admin Login error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
