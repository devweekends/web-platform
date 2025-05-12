import { NextResponse } from 'next/server';
import { Session } from '@/models/Session';
import connectDB from '@/lib/db';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import { ActivityLog } from '@/models/ActivityLog';
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies';

const JWT_SECRET = process.env.JWT_SECRET;

// GET all sessions
export async function GET() {
  try {
    await connectDB();
    const sessions = await Session.find().sort({ createdAt: -1 });
    return NextResponse.json(sessions);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
}

// POST new session
export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    // Get admin username from JWT
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }
    const session = new Session({ ...data, lastModifiedBy: adminUsername });
    await session.save();
    await ActivityLog.create({
      entityType: 'Session',
      entityId: session._id.toString(),
      action: 'add',
      adminUsername,
      details: { name: session.name, date: session.date },
    });
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create session' }, { status: 500 });
  }
}

// PUT update session
export async function PUT(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    const data = await request.json();
    // Get admin username from JWT
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }
    const session = await Session.findByIdAndUpdate(id, { ...data, lastModifiedBy: adminUsername }, { new: true });
    if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await ActivityLog.create({
      entityType: 'Session',
      entityId: session._id.toString(),
      action: 'edit',
      adminUsername,
      details: { name: session.name, date: session.date },
    });
    return NextResponse.json(session);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update session' }, { status: 500 });
  }
}

// DELETE session
export async function DELETE(request: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    const cookieStore: ReadonlyRequestCookies = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    let adminUsername = 'Unknown';
    if (token && JWT_SECRET) {
      try {
        const decoded: any = verify(token, JWT_SECRET as string);
        adminUsername = decoded.username || 'Unknown';
      } catch {}
    }
    const session = await Session.findByIdAndDelete(id);
    if (!session) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    await ActivityLog.create({
      entityType: 'Session',
      entityId: session._id.toString(),
      action: 'delete',
      adminUsername,
      details: { name: session.name, date: session.date },
    });
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete session' }, { status: 500 });
  }
} 