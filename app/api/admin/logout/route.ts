import { NextResponse } from 'next/server';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

export async function POST() {
  const response = NextResponse.json(
    { success: true },
    { status: 200 }
  );

  // Clear the admin token cookie
  response.cookies.set({
    name: 'admin-token',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  // Clear the admin code verification cookie
  response.cookies.set({
    name: 'admin-code-verified',
    value: '',
    expires: new Date(0),
    path: '/',
  });

  return response;
} 