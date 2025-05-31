import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IMentor extends Document {
  name: string;
  email: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  leetcode?: string;
  picture?: string;
  university?: string;
  mentees: mongoose.Types.ObjectId[];
  tags: mongoose.Types.ObjectId[];
  username?: string;
  password?: string;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const MentorSchema = new Schema<IMentor>(
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
    mentees: [{
      type: Schema.Types.ObjectId,
      ref: 'Mentee'
    }],
    tags: [{
      type: Schema.Types.ObjectId,
      ref: 'Tag'
    }],
    username: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    password: {
      type: String,
      select: false, // Don't return password by default
    }
  },
  {
    timestamps: true,
  }
);

// Add pre-save hook for password hashing
MentorSchema.pre('save', async function(next) {
  if (this.password && this.isModified('password')) {
    try {
      this.password = await bcryptjs.hash(this.password, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }
  next();
});

// Add method to compare passwords
MentorSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    if (!this.password) return false;
    return await bcryptjs.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

export const Mentor = mongoose.models.Mentor || mongoose.model<IMentor>('Mentor', MentorSchema); 