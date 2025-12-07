import mongoose, { Schema, Document } from 'mongoose';
import bcryptjs from 'bcryptjs';

export interface IDSOCMentor extends Document {
  name: string;
  email: string;
  username: string;
  password: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  website?: string;
  picture?: string;
  bio?: string;
  company?: string;
  jobTitle?: string;
  expertise: string[];
  projects: mongoose.Types.ObjectId[];
  mentees: mongoose.Types.ObjectId[];
  timezone?: string;
  availability?: string;
  discordId?: string;
  discordUsername?: string;
  isActive: boolean;
  isVerified: boolean;
  comparePassword: (candidatePassword: string) => Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

const DSOCMentorSchema = new Schema<IDSOCMentor>(
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
    website: {
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
    company: {
      type: String,
      trim: true,
    },
    jobTitle: {
      type: String,
      trim: true,
    },
    expertise: [{
      type: String,
      trim: true,
    }],
    projects: [{
      type: Schema.Types.ObjectId,
      ref: 'DSOCProject',
    }],
    mentees: [{
      type: Schema.Types.ObjectId,
      ref: 'DSOCMentee',
    }],
    timezone: {
      type: String,
      trim: true,
    },
    availability: {
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
DSOCMentorSchema.pre('save', async function(next) {
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
DSOCMentorSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  try {
    if (!this.password) return false;
    return await bcryptjs.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

export const DSOCMentor = mongoose.models.DSOCMentor || mongoose.model<IDSOCMentor>('DSOCMentor', DSOCMentorSchema);
