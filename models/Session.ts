import mongoose, { Schema, models } from 'mongoose';
import { defineModel } from '@/lib/model';

const sessionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  speaker: { type: String, required: true },
  lastModifiedBy: { type: String, default: 'Unknown' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

sessionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

export const Session = defineModel('Session', sessionSchema); 