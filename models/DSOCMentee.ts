import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IDSOCMentee extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  portfolio?: string;
  picture?: string;
  bio?: string;
  university?: string;
  degree?: string;
  graduationYear?: number;
  skills: string[];
  projects: mongoose.Types.ObjectId[];
  applications: mongoose.Types.ObjectId[];
  mentor?: mongoose.Types.ObjectId;
  timezone?: string;
  discordId?: string;
  discordUsername?: string;
  resumeUrl?: string;
  isActive: boolean;
  isVerified: boolean;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const DSOCMenteeSchema = new Schema<IDSOCMentee>(
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
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      select: false,
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
    twitter: {
      type: String,
      trim: true,
    },
    portfolio: {
      type: String,
      trim: true,
    },
    picture: {
      type: String,
      trim: true,
    },
    bio: {
      type: String,
      trim: true,
    },
    university: {
      type: String,
      trim: true,
    },
    degree: {
      type: String,
      trim: true,
    },
    graduationYear: {
      type: Number,
    },
    skills: [{
      type: String,
      trim: true,
    }],
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'DSOCProject',
    }],
    applications: [{
      type: Schema.Types.ObjectId,
      ref: 'DSOCApplication',
    }],
    mentor: {
      type: Schema.Types.ObjectId,
      ref: 'DSOCMentor',
    },
    timezone: {
      type: String,
      trim: true,
    },
    discordId: {
      type: String,
      trim: true,
    },
    discordUsername: {
      type: String,
      trim: true,
    },
    resumeUrl: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving
DSOCMenteeSchema.pre('save', async function(next) {
  if (this.password && this.isModified('password')) {
    try {
      this.password = await bcryptjs.hash(this.password, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }
  next();
});

// Compare password method
DSOCMenteeSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    if (!this.password) return false;
    return await bcryptjs.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

export const DSOCMentee = mongoose.models.DSOCMentee || mongoose.model<IDSOCMentee>('DSOCMentee', DSOCMenteeSchema);
