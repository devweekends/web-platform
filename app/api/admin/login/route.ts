import { NextResponse } from 'next/server';
import { Admin } from '@/models/Admin';
import { signToken } from '@/lib/jwt';
import { cookies } from 'next/headers';
import connectDB  from '@/lib/db'; // Fixed import syntax
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    await connectDB();
    const { username, password } = await request.json();

    const admin = await Admin.findOne({ username });
    if (!admin) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isValid = await admin.comparePassword(password);
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = await signToken({
      id: admin._id.toString(),
      username: admin.username
    });

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Set cookie with proper options
    response.cookies.set({
      name: 'admin-token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 // 1 day
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 