import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const AMBASSADOR_ACCESS_CODE = process.env.AMBASSADOR_ACCESS_CODE;

export async function POST(request: Request) {
  try {
    const { code } = await request.json();
    if (code !== AMBASSADOR_ACCESS_CODE) {
      return NextResponse.json(
        { error: 'Invalid access code' },
        { status: 401 }
      );
    }
    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );
    response.cookies.set({
      name: 'ambassador-access-verified',
      value: 'true',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 5 // 5 minutes
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 