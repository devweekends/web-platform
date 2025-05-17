import { NextResponse } from 'next/server';
import { Task } from '@/models/Task';
import { Ambassador } from '@/models/Ambassador';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import connectDB from '@/lib/db';

const JWT_SECRET = process.env.JWT_SECRET;

export async function GET() {
  try {
    await connectDB();
    
    // Check admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token || !JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    try {
      verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Fetch all tasks with ambassador details
    const tasks = await Task.find({}).sort({ createdAt: -1 });
    
    // Populate ambassador names for tasks assigned to specific ambassadors
    const populatedTasks = await Promise.all(
      tasks.map(async (task) => {
        const taskObj = task.toObject();
        
        if (taskObj.assignedTo !== 'all') {
          try {
            const ambassador = await Ambassador.findById(taskObj.assignedTo);
            taskObj.assignedToName = ambassador ? ambassador.name : 'Unknown';
          } catch (error) {
            taskObj.assignedToName = 'Unknown';
          }
        } else {
          taskObj.assignedToName = 'All Ambassadors';
        }
        
        // Ensure notes are included in the response
        taskObj.notes = taskObj.notes || '';
        taskObj.lastUpdatedBy = taskObj.lastUpdatedBy || '';
        
        return taskObj;
      })
    );
    
    return NextResponse.json(populatedTasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectDB();
    // Check admin authentication
    const cookieStore = await cookies();
    const token = cookieStore.get('admin-token')?.value;
    if (!token || !JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    try {
      verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Get taskId from query params
    const url = new URL(request.url);
    const taskId = url.searchParams.get('id');
    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }
    const deleted = await Task.findByIdAndDelete(taskId);
    if (!deleted) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete task' }, { status: 500 });
  }
} 