import mongoose, { Schema, Document } from 'mongoose';

export interface IMentee extends Document {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  leetcode?: string;
  picture?: string;
  university?: string;
  mentor: mongoose.Types.ObjectId;
  tags: mongoose.Types.ObjectId[];
  isMentor: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const MenteeSchema = new Schema<IMentee>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    linkedin: {
      type: String,
      trim: true,
    },
    github: {
      type: String,
      trim: true,
    },
    leetcode: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    university: {
      type: String,
      trim: true,
    },
    mentor: {
      type: Schema.Types.ObjectId,
      ref: 'Mentor',
      required: [true, 'Mentor is required'],
    },
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    isMentor: {
      type: Boolean,
      default: false,
    }
  },
  {
    timestamps: true,
  }
);

export const Mentee = mongoose.models.Mentee || mongoose.model<IMentee>('Mentee', MenteeSchema); 