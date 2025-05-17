import { NextResponse } from 'next/server';
import { Task } from '@/models/Task';
import { Ambassador } from '@/models/Ambassador';
import connectDB from '@/lib/db';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export async function POST(request: Request) {
  try {
    await connectDB();
    const { title, description, assignedTo } = await request.json();
    if (!title || !description || !assignedTo) {
      return NextResponse.json({ error: 'Title, description, and assignedTo are required' }, { status: 400 });
    }
    // Only allow admin
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token || !JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    let adminUsername = 'Unknown';
    try {
      const decoded: any = verify(token, JWT_SECRET);
      adminUsername = decoded.username || 'Unknown';
    } catch {}
    // If assignedTo is 'all', create a single task with assignedTo: 'all'
    // Otherwise, create a task for the specific ambassador
    let task;
    if (assignedTo === 'all') {
      task = await Task.create({ title, description, assignedTo: 'all', createdBy: adminUsername });
    } else {
      // Validate ambassador exists
      const ambassador = await Ambassador.findById(assignedTo);
      if (!ambassador) {
        return NextResponse.json({ error: 'Ambassador not found' }, { status: 404 });
      }
      task = await Task.create({ title, description, assignedTo, createdBy: adminUsername });
      // Optionally, add task to ambassador.tasks array
      ambassador.tasks.push(task._id);
      await ambassador.save();
    }
    return NextResponse.json({ success: true, task });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to assign task' }, { status: 500 });
  }
} 