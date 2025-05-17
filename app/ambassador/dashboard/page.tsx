'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, CheckCircle, Clock, ExternalLink, RefreshCw, LogOut } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';

interface Task {
  _id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export default function AmbassadorDashboard() {
  const router = useRouter();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState<string>('');
  const [updatedNotes, setUpdatedNotes] = useState<string>('');
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    setLoading(true);
    try {
      const response = await fetch('/api/ambassador/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/ambassador/logout', { method: 'POST' });
      router.push('/ambassador');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const handleUpdateTask = async () => {
    if (!selectedTask) return;
    
    setIsUpdating(true);
    setUpdateSuccess(false);
    setError('');
    
    try {
      const response = await fetch('/api/ambassador/tasks', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          taskId: selectedTask._id,
          status: updatedStatus,
          notes: updatedNotes.trim(),
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update task');
      }
      
      const data = await response.json();
      
      // Update the task in the local state
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === selectedTask._id ? data.task : task
        )
      );
      
      setUpdateSuccess(true);
      setTimeout(() => {
        setIsDialogOpen(false);
        setUpdateSuccess(false);
        setSelectedTask(null);
        setUpdatedStatus('');
        setUpdatedNotes('');
      }, 1500);
      
    } catch (err: any) {
      console.error('Error updating task:', err);
      setError(err.message || 'Failed to update task');
    } finally {
      setIsUpdating(false);
    }
  };

  const openTaskDialog = (task: Task) => {
    setSelectedTask(task);
    setUpdatedStatus(task.status);
    setUpdatedNotes(task.notes || '');
    setIsDialogOpen(true);
    setError('');
  };

  // Function to render status badges
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Completed
          </span>
        );
      case 'in-progress':
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 mr-1" />
            In Progress
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <AlertCircle className="w-3 h-3 mr-1" />
            Pending
          </span>
        );
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Ambassador Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={fetchTasks} 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh Tasks
          </Button>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
      
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>My Tasks</CardTitle>
          <CardDescription>View and manage tasks assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="text-destructive bg-red-50 p-4 rounded-md">{error}</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">No tasks assigned yet.</div>
          ) : (
            <ul className="space-y-4">
              {tasks.map((task) => (
                <li key={task._id} className="border rounded-lg shadow-sm hover:shadow transition-shadow">
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{task.title}</h3>
                      {renderStatusBadge(task.status)}
                    </div>
                    <p className="text-muted-foreground mb-3 text-sm">{task.description}</p>
                    
                    <div className="flex items-center text-xs text-muted-foreground mb-3">
                      <span>Assigned: {formatDate(task.createdAt)}</span>
                      {task.notes && <span className="ml-4">Has your notes</span>}
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        size="sm" 
                        onClick={() => openTaskDialog(task)}
                        className="flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Update Status & Notes
                      </Button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
      
      {/* Task update dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>
              Change the status and add notes for this task
            </DialogDescription>
          </DialogHeader>
          
          {selectedTask && (
            <div className="space-y-4 py-2">
              <div>
                <h3 className="font-semibold text-lg">{selectedTask.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{selectedTask.description}</p>
              </div>
              
              <Separator />
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="status">Task Status</label>
                <Select 
                  value={updatedStatus} 
                  onValueChange={setUpdatedStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="notes">Notes for Admin</label>
                <Textarea
                  id="notes"
                  placeholder="Add notes about your progress, issues, or questions..."
                  value={updatedNotes}
                  onChange={(e) => setUpdatedNotes(e.target.value)}
                  rows={4}
                />
              </div>
              
              <DialogFooter>
                {updateSuccess ? (
                  <div className="text-green-600 flex items-center">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Task updated successfully!
                  </div>
                ) : (
                  <Button 
                    onClick={handleUpdateTask} 
                    disabled={isUpdating}
                  >
                    {isUpdating ? 'Updating...' : 'Update Task'}
                  </Button>
                )}
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
} 