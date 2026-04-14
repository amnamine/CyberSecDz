import { NextResponse } from 'next/server';

const EXPRESS_API_URL = process.env.EXPRESS_API_URL || 'http://localhost:4000';

export async function forwardToExpress(path: string, payload: unknown) {
  try {
    const response = await fetch(`${EXPRESS_API_URL}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error(`Express proxy error for ${path}`, error);
    return NextResponse.json(
      { error: 'Backend service unavailable. Start Express backend and try again.' },
      { status: 503 },
    );
  }
}
