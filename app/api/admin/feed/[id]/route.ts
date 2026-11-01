import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { verify } from 'jsonwebtoken';
import connectDB from '@/lib/db';
import { LinkedInPost } from '@/models/LinkedInPost';
import { ActivityLog } from '@/models/ActivityLog';

const JWT_SECRET = process.env.JWT_SECRET;
const STATUSES = ['approved', 'pending', 'hidden'];

async function getAdminUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get('admin-token')?.value;
  if (!token || !JWT_SECRET) return null;

  try {
    const decoded = verify(token, JWT_SECRET) as { username?: string };
    return decoded.username || 'Unknown';
  } catch {
    return null;
  }
}

/** Approve, hide or re-queue a post */
export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminUsername = await getAdminUser();
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    if (!STATUSES.includes(data.status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
    }

    await connectDB();
    const post = await LinkedInPost.findByIdAndUpdate(id, { status: data.status }, { new: true });
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await ActivityLog.create({
      entityType: 'LinkedInPost',
      entityId: id,
      action: 'update',
      adminUsername,
      details: { url: post.url, status: post.status },
    });
    revalidatePath('/feed');

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error updating feed post:', error);
    return NextResponse.json({ error: 'Failed to update feed post' }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const adminUsername = await getAdminUser();
    if (!adminUsername) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    const post = await LinkedInPost.findByIdAndDelete(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    await ActivityLog.create({
      entityType: 'LinkedInPost',
      entityId: id,
      action: 'delete',
      adminUsername,
      details: { url: post.url },
    });
    revalidatePath('/feed');

    return NextResponse.json({ message: 'Post deleted' });
  } catch (error) {
    console.error('Error deleting feed post:', error);
    return NextResponse.json({ error: 'Failed to delete feed post' }, { status: 500 });
  }
}
