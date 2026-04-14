import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

const USERS_FILE = path.join(process.cwd(), 'data/users.json');
const CARDS_FILE = path.join(process.cwd(), 'data/isolated_card_data.json');

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { basicInfo, username, password, cardInfo } = body;

    if (!username || !password || !cardInfo || !cardInfo.number) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Read existing data
    const usersData = JSON.parse(await fs.readFile(USERS_FILE, 'utf-8'));
    const cardsData = JSON.parse(await fs.readFile(CARDS_FILE, 'utf-8'));

    if (usersData.some((u: { username: string; [key: string]: unknown }) => u.username === username)) {
      return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const cardId = uuidv4();

    // Isolate card data mapping ONLY via uuid
    const newCard = {
      id: cardId,
      face: cardInfo.face,
      number: cardInfo.number,
      userId: userId // Link to user via UUID securely
    };

    const newUser = {
      id: userId,
      basicInfo,
      username,
      password: hashedPassword,
      cardDataId: cardId // Link to card data via UUID
    };

    usersData.push(newUser);
    cardsData.push(newCard);

    await fs.writeFile(USERS_FILE, JSON.stringify(usersData, null, 2));
    await fs.writeFile(CARDS_FILE, JSON.stringify(cardsData, null, 2));

    return NextResponse.json({ message: 'User registered successfully', userId }, { status: 201 });
  } catch (error) {
    console.error('Registration error', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
