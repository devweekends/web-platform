import mongoose, { Schema, Document } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  imageUrl: string;
  demoUrl?: string;
  videoDemoUrl?: string;
  githubUrl?: string;
  submitterName: string;
  submitterEmail: string;
  isApproved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema<IProject>(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Project image is required'],
    },
    demoUrl: {
      type: String,
      trim: true,
    },
    videoDemoUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    submitterName: {
      type: String,
      required: [true, 'Submitter name is required'],
      trim: true,
    },
    submitterEmail: {
      type: String,
      required: [true, 'Submitter email is required'],
      trim: true,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Index for easier searching if needed later
ProjectSchema.index({ title: 'text', description: 'text', submitterName: 'text' });

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
