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
    const cookiesList = await cookies();
    const token = cookiesList.get('ambassador-token')?.value;
    if (!token || !JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    let decoded: any;
    try {
      decoded = verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const ambassadorId = decoded.id;
    // Find tasks assigned to this ambassador or to 'all'
    const tasks = await Task.find({
      $or: [
        { assignedTo: ambassadorId },
        { assignedTo: 'all' }
      ]
    }).sort({ createdAt: -1 });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch tasks' },
      { status: 500 }
    );
  }
}

export async function PUT(request: Request) {
  try {
    await connectDB();
    
    // Verify ambassador authentication
    const cookiesList = await cookies();
    const token = cookiesList.get('ambassador-token')?.value;
    if (!token || !JWT_SECRET) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    let decoded: any;
    try {
      decoded = verify(token, JWT_SECRET);
    } catch {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const ambassadorId = decoded.id;
    const ambassadorUsername = decoded.username;
    
    // Parse request body
    const { taskId, status, notes } = await request.json();
    
    if (!taskId) {
      return NextResponse.json({ error: 'Task ID is required' }, { status: 400 });
    }
    
    // Find the task
    const task = await Task.findById(taskId);
    
    if (!task) {
      return NextResponse.json({ error: 'Task not found' }, { status: 404 });
    }
    
    // Verify the task is assigned to this ambassador or to all ambassadors
    if (task.assignedTo !== 'all' && task.assignedTo.toString() !== ambassadorId) {
      return NextResponse.json({ error: 'Unauthorized to update this task' }, { status: 403 });
    }
    
    // Update the task directly using findByIdAndUpdate
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        $set: {
          ...(status && { status }),
          notes: notes || '', // Always set notes, even if empty
          lastUpdatedBy: ambassadorUsername,
          updatedAt: new Date()
        }
      },
      { new: true }
    );
    
    if (!updatedTask) {
      return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
    }
    
    return NextResponse.json({ success: true, task: updatedTask });
  } catch (error) {
    console.error('Error updating task:', error);
    return NextResponse.json(
      { error: 'Failed to update task' },
      { status: 500 }
    );
  }
} 