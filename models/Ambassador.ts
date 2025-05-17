import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const ambassadorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  university: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  linkedin: {
    type: String,
    required: true,
  },
  github: {
    type: String,
    required: false,
  },
  leetcode: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    unique: true,
    sparse: true,
    trim: true,
  },
  password: {
    type: String,
    select: false,
  },
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
  }],
  lastModifiedBy: {
    type: String,
    default: 'Unknown',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
ambassadorSchema.pre('save', async function(next) {
  if (this.password && this.isModified('password')) {
    try {
      this.password = await bcrypt.hash(this.password, 10);
    } catch (error) {
      console.error('Error hashing password:', error);
    }
  }
  this.updatedAt = new Date();
  next();
});

ambassadorSchema.methods.comparePassword = async function(candidatePassword: string) {
  try {
    if (!this.password) return false;
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    console.error('Password comparison error:', error);
    return false;
  }
};

const Ambassador = mongoose.models.Ambassador || mongoose.model('Ambassador', ambassadorSchema);

export { Ambassador }; 