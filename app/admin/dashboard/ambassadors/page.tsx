'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, X, Table, UserCog, ListTodo, FileText, CheckCircle, Clock, AlertCircle, Calendar, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Image from 'next/image';
import { Separator } from '@/components/ui/separator';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface Ambassador {
  _id: string;
  name: string;
  university: string;
  bio: string;
  image: string;
  linkedin: string;
  github?: string;
  leetcode?: string;
  username?: string;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedToName?: string;
  status: 'pending' | 'in-progress' | 'completed';
  notes: string;
  createdBy: string;
  lastUpdatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export default function AmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<Ambassador[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    university: '',
    bio: '',
    image: '',
    linkedin: '',
    github: '',
    leetcode: ''
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [view, setView] = useState<'card' | 'table'>('card');
  const [activeTab, setActiveTab] = useState('profiles');
  
  // Credentials form state
  const [credentialsFormData, setCredentialsFormData] = useState({
    id: '',
    username: '',
    password: '',
  });

  // Task form state
  const [taskFormData, setTaskFormData] = useState({
    title: '',
    description: '',
    assignedTo: '',
  });

  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskDetailsOpen, setIsTaskDetailsOpen] = useState(false);

  useEffect(() => {
    fetchAmbassadors();
    fetchTasks();
  }, []);

  const fetchAmbassadors = async () => {
    try {
      const response = await fetch('/api/admin/ambassadors');
      if (!response.ok) throw new Error('Failed to fetch ambassadors');
      const data = await response.json();
      setAmbassadors(data);
    } catch (error) {
      setError('Failed to load ambassadors');
      console.error('Error fetching ambassadors:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await fetch('/api/admin/tasks');
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      university: '',
      bio: '',
      image: '',
      linkedin: '',
      github: '',
      leetcode: ''
    });
    setImageFile(null);
    setImagePreview('');
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // First, upload the image if there's a file
      let imageUrl = formData.image;
      if (imageFile) {
        const imageFormData = new FormData();
        imageFormData.append('file', imageFile);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: imageFormData,
        });
        
        if (!uploadResponse.ok) throw new Error('Failed to upload image');
        const { url } = await uploadResponse.json();
        imageUrl = url;
      }

      // Then create or update the ambassador
      const url = editingId 
        ? `/api/admin/ambassadors?id=${editingId}`
        : '/api/admin/ambassadors';
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          image: imageUrl,
        }),
      });

      if (!response.ok) throw new Error(editingId ? 'Failed to update ambassador' : 'Failed to add ambassador');
      
      const updatedAmbassador = await response.json();
      
      if (editingId) {
        setAmbassadors(ambassadors.map(a => 
          a._id === editingId ? updatedAmbassador : a
        ));
      } else {
        setAmbassadors([updatedAmbassador, ...ambassadors]);
      }
      
      resetForm();
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (ambassador: Ambassador) => {
    setFormData({
      name: ambassador.name,
      university: ambassador.university,
      bio: ambassador.bio,
      image: ambassador.image,
      linkedin: ambassador.linkedin,
      github: ambassador.github || '',
      leetcode: ambassador.leetcode || ''
    });
    setImagePreview(ambassador.image);
    setEditingId(ambassador._id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this ambassador?')) return;

    try {
      const response = await fetch(`/api/admin/ambassadors?id=${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete ambassador');
      
      setAmbassadors(ambassadors.filter(a => a._id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  // Handle credential updates
  const handleCredentialsEdit = (ambassador: Ambassador) => {
    setCredentialsFormData({
      id: ambassador._id,
      username: ambassador.username || '',
      password: '',
    });
  };

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/ambassadors/credentials', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentialsFormData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update credentials');
      }
      
      // Reset password field but keep the form open
      setCredentialsFormData({
        ...credentialsFormData,
        password: '',
      });
      
      // Refresh ambassador data
      fetchAmbassadors();
      
      alert('Credentials updated successfully');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle task assignment
  const handleTaskSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/admin/ambassadors/task', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskFormData),
      });

      if (!response.ok) throw new Error('Failed to assign task');
      
      // Reset task form
      setTaskFormData({
        title: '',
        description: '',
        assignedTo: '',
      });
      
      alert('Task assigned successfully');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to get status badge color
  const getStatusBadge = (status: string) => {
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const viewTaskDetails = (task: Task) => {
    setSelectedTask(task);
    setIsTaskDetailsOpen(true);
  };

  // Add this function to handle task deletion
  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    try {
      const response = await fetch(`/api/admin/tasks?id=${taskId}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete task');
      // Refresh tasks
      fetchTasks();
    } catch (error: any) {
      alert(error.message || 'Failed to delete task');
    }
  };

  const renderTaskTable = (tasksToShow: Task[]) => (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="min-w-full divide-y divide-border">
        <thead className="bg-muted">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Task Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Assigned To</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Created At</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Updated</th>
            <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {tasksToShow.length > 0 ? (
            tasksToShow.map((task) => (
              <tr key={task._id} className="hover:bg-muted/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {task.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {task.assignedToName || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getStatusBadge(task.status)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-3 h-3 mr-1" />
                    {formatDate(task.createdAt)}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-muted-foreground">
                  {task.lastUpdatedBy ? (
                    <span>By {task.lastUpdatedBy}</span>
                  ) : (
                    <span>Not updated yet</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => viewTaskDetails(task)}
                    className="flex items-center"
                  >
                    <FileText className="w-3 h-3 mr-1" />
                    View Details
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-600 hover:text-red-700 flex items-center"
                    onClick={() => handleDeleteTask(task._id)}
                  >
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="px-6 py-4 text-center text-muted-foreground">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );

  if (loading && !isAdding) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading ambassadors...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Ambassadors</h1>
      </div>

      {error && (
        <div className="p-4 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="profiles">Ambassador Profiles</TabsTrigger>
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="tasks">Assign Tasks</TabsTrigger>
          <TabsTrigger value="taskList">Task List</TabsTrigger>
        </TabsList>
        
        <TabsContent value="profiles" className="mt-0">
          <div className="flex justify-between items-center mb-4">
            <div className="flex gap-2 items-center">
              <Button
                variant={view === 'card' ? 'default' : 'outline'}
                onClick={() => setView('card')}
              >
                Card View
              </Button>
              <Button
                variant={view === 'table' ? 'default' : 'outline'}
                onClick={() => setView('table')}
              >
                <Table className="w-4 h-4 mr-2" /> Table View
              </Button>
            </div>
            <Button
              onClick={() => setIsAdding(true)}
              className="flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Ambassador
            </Button>
          </div>

          {isAdding && (
            <div className="bg-card p-6 rounded-lg border mb-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">
                  {editingId ? 'Edit Ambassador' : 'Add New Ambassador'}
                </h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={resetForm}
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">University</Label>
                    <Input
                      id="university"
                      value={formData.university}
                      onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="image">Image</Label>
                  <div className="flex items-center space-x-4">
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => document.getElementById('image')?.click()}
                    >
                      Choose Image
                    </Button>
                    {imagePreview && (
                      <div className="relative w-20 h-20">
                        <Image
                          src={imagePreview}
                          alt="Preview"
                          fill
                          className="object-cover rounded-full"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn URL</Label>
                  <Input
                    id="linkedin"
                    type="url"
                    value={formData.linkedin}
                    onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="github">GitHub URL</Label>
                  <Input
                    id="github"
                    type="url"
                    value={formData.github}
                    onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="leetcode">LeetCode URL</Label>
                  <Input
                    id="leetcode"
                    type="url"
                    value={formData.leetcode}
                    onChange={(e) => setFormData({ ...formData, leetcode: e.target.value })}
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={resetForm}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? 'Saving...' : editingId ? 'Update Ambassador' : 'Add Ambassador'}
                  </Button>
                </div>
              </form>
            </div>
          )}

          {view === 'card' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ambassadors.map((ambassador) => (
                <Card key={ambassador._id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="relative h-48 w-full">
                      <Image
                        src={ambassador.image || '/placeholder-ambassador.jpg'}
                        alt={ambassador.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder-ambassador.jpg';
                        }}
                        unoptimized={!ambassador.image?.startsWith('http')}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold">{ambassador.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{ambassador.university}</p>
                      <p className="text-sm mb-4 line-clamp-2">{ambassador.bio}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {ambassador.linkedin && (
                            <a
                              href={ambassador.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white p-1 rounded-full hover:opacity-80 transition-colors border"
                              aria-label={`LinkedIn profile of ${ambassador.name}`}
                            >
                              <Image
                                src="/linkedin.png"
                                alt="LinkedIn"
                                width={18}
                                height={18}
                              />
                            </a>
                          )}
                          {ambassador.github && (
                            <a
                              href={ambassador.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white p-1 rounded-full hover:opacity-80 transition-colors border"
                              aria-label={`GitHub profile of ${ambassador.name}`}
                            >
                              <svg className="w-5 h-5" fill="#24292f" viewBox="0 0 24 24">
                                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                              </svg>
                            </a>
                          )}
                          {ambassador.leetcode && (
                            <a
                              href={ambassador.leetcode}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-white p-1 rounded-full hover:opacity-80 transition-colors border"
                              aria-label={`LeetCode profile of ${ambassador.name}`}
                            >
                              <Image
                                src="/leetcode.png"
                                alt="LeetCode"
                                width={18}
                                height={18}
                              />
                            </a>
                          )}
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => handleEdit(ambassador)}
                          >
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="icon"
                            className="text-red-500 hover:text-red-600"
                            onClick={() => handleDelete(ambassador._id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto rounded-lg border bg-card">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">University</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Bio</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">LinkedIn</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">GitHub</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">LeetCode</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ambassadors.map((ambassador) => (
                    <tr key={ambassador._id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            src={ambassador.image || '/placeholder-ambassador.jpg'}
                            alt={ambassador.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="ml-3 font-medium">{ambassador.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{ambassador.university}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground max-w-xs truncate">{ambassador.bio}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ambassador.linkedin && (
                          <a href={ambassador.linkedin} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full hover:opacity-80 transition-colors border flex items-center justify-center bg-white" title="LinkedIn">
                            <Image src="/linkedin.png" alt="LinkedIn" width={18} height={18} />
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ambassador.github && (
                          <a
                            href={ambassador.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1 rounded-full hover:opacity-80 transition-colors border"
                            aria-label={`GitHub profile of ${ambassador.name}`}
                          >
                            <svg className="w-5 h-5" fill="#24292f" viewBox="0 0 24 24">
                              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.592 1.028 2.683 0 3.841-2.337 4.687-4.565 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.477-10-10-10z" />
                            </svg>
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ambassador.leetcode && (
                          <a href={ambassador.leetcode} target="_blank" rel="noopener noreferrer" className="p-1 rounded-full hover:opacity-80 transition-colors border flex items-center justify-center bg-white" title="LeetCode">
                            <Image src="/leetcode.png" alt="LeetCode" width={18} height={18} />
                          </a>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" onClick={() => handleEdit(ambassador)}>
                            <Pencil className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="text-red-500 hover:text-red-600" onClick={() => handleDelete(ambassador._id)}>
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="credentials" className="mt-0">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-6">Ambassador Credentials Management</h2>
            
            <div className="overflow-x-auto rounded-lg border bg-card">
              <table className="min-w-full divide-y divide-border">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">University</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Current Username</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {ambassadors.map((ambassador) => (
                    <tr key={ambassador._id} className="hover:bg-muted/50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            src={ambassador.image || '/placeholder-ambassador.jpg'}
                            alt={ambassador.name}
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span className="ml-3 font-medium">{ambassador.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{ambassador.university}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {ambassador.username ? (
                          <span className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs">
                            {ambassador.username}
                          </span>
                        ) : (
                          <span className="px-2 py-1 bg-amber-50 text-amber-700 rounded-full text-xs">
                            Not set
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleCredentialsEdit(ambassador)}
                              className="flex items-center"
                            >
                              <UserCog className="w-3 h-3 mr-1" />
                              {ambassador.username ? "Update Credentials" : "Set Credentials"}
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>
                                {ambassador.username ? "Update Credentials" : "Set Credentials"} for {ambassador.name}
                              </DialogTitle>
                              <DialogDescription>
                                {ambassador.username 
                                  ? "Update the username and password for this ambassador." 
                                  : "Set a username and password for this ambassador to allow them to log in."}
                              </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCredentialsSubmit} className="space-y-4 mt-4">
                              <input 
                                type="hidden" 
                                name="id" 
                                value={credentialsFormData.id} 
                              />
                              
                              <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                  id="username"
                                  value={credentialsFormData.username}
                                  onChange={(e) => setCredentialsFormData({ ...credentialsFormData, username: e.target.value })}
                                  required
                                />
                              </div>
                              
                              <div className="space-y-2">
                                <Label htmlFor="password">Password {ambassador.username && '(leave empty to keep current)'}</Label>
                                <Input
                                  id="password"
                                  type="password"
                                  value={credentialsFormData.password}
                                  onChange={(e) => setCredentialsFormData({ ...credentialsFormData, password: e.target.value })}
                                  required={!ambassador.username}
                                />
                              </div>
                              
                              <div className="flex justify-end space-x-4 mt-6">
                                <Button
                                  type="submit"
                                  disabled={loading}
                                >
                                  {loading ? 'Saving...' : 'Save Credentials'}
                                </Button>
                              </div>
                            </form>
                          </DialogContent>
                        </Dialog>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="mt-0">
          <div className="bg-card p-6 rounded-lg border">
            <h2 className="text-xl font-semibold mb-6">Assign Tasks to Ambassadors</h2>
            
            <form onSubmit={handleTaskSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  value={taskFormData.title}
                  onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-description">Task Description</Label>
                <Textarea
                  id="task-description"
                  value={taskFormData.description}
                  onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="task-assignee">Assign To</Label>
                <select
                  id="task-assignee"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={taskFormData.assignedTo}
                  onChange={(e) => setTaskFormData({ ...taskFormData, assignedTo: e.target.value })}
                  required
                >
                  <option value="" disabled>Select an ambassador</option>
                  <option value="all">All Ambassadors</option>
                  {ambassadors.map((ambassador) => (
                    ambassador.username && (
                      <option key={ambassador._id} value={ambassador._id}>
                        {ambassador.name} ({ambassador.university})
                      </option>
                    )
                  ))}
                </select>
              </div>
              
              <div className="flex justify-end space-x-4 mt-6">
                <Button
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Assigning...' : 'Assign Task'}
                </Button>
              </div>
            </form>
            
            <Separator className="my-8" />
            
            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">Task Management</h3>
              <p className="text-muted-foreground mb-4">
                View and manage all tasks in the dedicated Task Management page (coming soon)
              </p>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="taskList" className="mt-0">
          <div className="bg-card p-6 rounded-lg border">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Task List</h2>
              <Button
                variant="outline"
                onClick={fetchTasks}
                className="flex items-center"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>

            <Tabs defaultValue="all" className="mb-6">
              <TabsList>
                <TabsTrigger value="all">All Tasks</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>

              <TabsContent value="all">
                {renderTaskTable(tasks)}
              </TabsContent>
              
              <TabsContent value="pending">
                {renderTaskTable(tasks.filter(task => task.status === 'pending'))}
              </TabsContent>
              
              <TabsContent value="in-progress">
                {renderTaskTable(tasks.filter(task => task.status === 'in-progress'))}
              </TabsContent>
              
              <TabsContent value="completed">
                {renderTaskTable(tasks.filter(task => task.status === 'completed'))}
              </TabsContent>
            </Tabs>
          </div>

          {/* Task Details Dialog */}
          <Dialog open={isTaskDetailsOpen} onOpenChange={setIsTaskDetailsOpen}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Task Details</DialogTitle>
                <DialogDescription>
                  View detailed information about this task
                </DialogDescription>
              </DialogHeader>
              
              {selectedTask && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium">{selectedTask.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Created by {selectedTask.createdBy} on {formatDate(selectedTask.createdAt)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Description</h4>
                    <p className="text-sm p-3 bg-muted rounded-md">{selectedTask.description}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Assigned To</h4>
                    <p className="text-sm">{selectedTask.assignedToName}</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Status</h4>
                    <div>{getStatusBadge(selectedTask.status)}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      Ambassador Notes {selectedTask.lastUpdatedBy && `(Last updated by ${selectedTask.lastUpdatedBy})`}
                    </h4>
                    {selectedTask.notes ? (
                      <p className="text-sm p-3 bg-muted rounded-md whitespace-pre-wrap">{selectedTask.notes}</p>
                    ) : (
                      <p className="text-sm text-muted-foreground">No notes provided yet</p>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Last Update</h4>
                    <p className="text-sm">
                      {selectedTask.lastUpdatedBy ? (
                        <>Updated by {selectedTask.lastUpdatedBy} on {formatDate(selectedTask.updatedAt)}</>
                      ) : (
                        'Not updated yet'
                      )}
                    </p>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
      </Tabs>
    </div>
  );
} 