// JWT utility functions for Edge Runtime
const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not defined');
}

interface JWTPayload {
  [key: string]: string | number | boolean | null | undefined;
  iat?: number;
  exp?: number;
  role?: string;
  id?: string;
}

// Convert string to Uint8Array
function stringToUint8Array(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

// Convert Uint8Array to string
function uint8ArrayToString(arr: Uint8Array): string {
  return new TextDecoder().decode(arr);
}

// Create HMAC key from secret
async function getKey(secret: string): Promise<CryptoKey> {
  const keyData = stringToUint8Array(secret);
  return await crypto.subtle.importKey(
    'raw',
    keyData,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify']
  );
}

// Base64 encode
function base64UrlEncode(str: string): string {
  return btoa(str)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

// Base64 decode
function base64UrlDecode(str: string): string {
  str = str.replace(/-/g, '+').replace(/_/g, '/');
  while (str.length % 4) str += '=';
  return atob(str);
}

// Shorthand for creating a token with id and role
export async function createToken(payload: { id: string, role: string }): Promise<string> {
  return signToken(payload);
}

// Sign JWT token
export async function signToken(payload: JWTPayload): Promise<string> {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  const header = { alg: 'HS256', typ: 'JWT' };
  const now = Math.floor(Date.now() / 1000);
  const exp = now + (60 * 60 * 24); // 1 day

  const finalPayload = {
    ...payload,
    iat: now,
    exp
  };

  const headerB64 = base64UrlEncode(JSON.stringify(header));
  const payloadB64 = base64UrlEncode(JSON.stringify(finalPayload));
  const data = `${headerB64}.${payloadB64}`;

  const key = await getKey(JWT_SECRET);
  const signature = await crypto.subtle.sign(
    'HMAC',
    key,
    stringToUint8Array(data)
  );

  const signatureB64 = base64UrlEncode(
    String.fromCharCode(...new Uint8Array(signature))
  );

  return `${data}.${signatureB64}`;
}

// Verify JWT token
export async function verifyToken(token: string): Promise<boolean> {
  if (!JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined');
  }

  try {
    const [headerB64, payloadB64, signatureB64] = token.split('.');
    
    if (!headerB64 || !payloadB64 || !signatureB64) {
      return false;
    }

    // Verify signature
    const key = await getKey(JWT_SECRET);
    const signature = Uint8Array.from(
      base64UrlDecode(signatureB64).split('').map(c => c.charCodeAt(0))
    );
    const data = stringToUint8Array(`${headerB64}.${payloadB64}`);
    
    const isValid = await crypto.subtle.verify(
      'HMAC',
      key,
      signature,
      data
    );

    if (!isValid) return false;

    // Check expiration
    const payload = JSON.parse(base64UrlDecode(payloadB64)) as JWTPayload;
    const now = Math.floor(Date.now() / 1000);
    
    return payload.exp ? payload.exp > now : false;
  } catch (error) {
    console.error('Token verification error:', error);
    return false;
  }
}

// Decode token to get payload
export function decodeToken(token: string): JWTPayload | null {
  try {
    const [_, payloadB64, __] = token.split('.');
    if (!payloadB64) return null;
    return JSON.parse(base64UrlDecode(payloadB64));
  } catch (error) {
    console.error('Token decode error:', error);
    return null;
  }
}

// Verify mentor token
export async function verifyMentorToken(token: string): Promise<boolean> {
  try {
    const isValid = await verifyToken(token);
    if (!isValid) return false;
    
    const payload = decodeToken(token);
    return payload?.role === 'mentor';
  } catch (error) {
    console.error('Mentor token verification error:', error);
    return false;
  }
} 