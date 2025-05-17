import mongoose, { Schema, Document } from 'mongoose';

export interface ITask extends Document {
  title: string;
  description: string;
  assignedTo: mongoose.Types.ObjectId | 'all'; // ambassador _id or 'all'
  createdBy: string; // admin username or id
  status: 'pending' | 'completed' | 'in-progress';
  notes: string; // Ambassador notes/feedback
  lastUpdatedBy: string; // Who last updated the task
  createdAt: Date;
  updatedAt: Date;
}

const TaskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  assignedTo: { type: Schema.Types.Mixed, required: true },
  createdBy: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['pending', 'in-progress', 'completed'], 
    default: 'pending' 
  },
  notes: { 
    type: String, 
    default: '',
    trim: true // Add trim to remove whitespace
  },
  lastUpdatedBy: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamps before saving
TaskSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add a method to update task
TaskSchema.methods.updateTask = async function(updates: Partial<ITask>) {
  Object.assign(this, updates);
  this.updatedAt = new Date();
  return this.save();
};

export const Task = mongoose.models.Task || mongoose.model<ITask>('Task', TaskSchema); 