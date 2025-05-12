import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const token = cookieStore.get('admin-token')?.value;

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