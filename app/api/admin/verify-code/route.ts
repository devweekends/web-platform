import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const ADMIN_ACCESS_CODE = process.env.ADMIN_ACCESS_CODE;

export async function POST(request: Request) {
  try {
    const { code } = await request.json();

    if (code !== ADMIN_ACCESS_CODE) {
      return NextResponse.json(
        { error: 'Invalid access code' },
        { status: 401 }
      );
    }

    const response = NextResponse.json(
      { success: true },
      { status: 200 }
    );

    // Set cookie to indicate code verification
    response.cookies.set({
      name: 'admin-code-verified',
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