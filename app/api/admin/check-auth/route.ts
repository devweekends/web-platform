import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('admin-token')?.value;

    if (!token) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    if (!JWT_SECRET) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const decoded = verify(token, JWT_SECRET);

    if (!decoded) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({ authenticated: true });
  } catch (error) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
} 