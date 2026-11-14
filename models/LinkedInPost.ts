import mongoose, { Schema, Document } from 'mongoose';
import { defineModel } from '@/lib/model';

export type LinkedInPostStatus = 'approved' | 'pending' | 'hidden';
export type LinkedInPostSource = 'seed' | 'olostep-search-index' | 'community-submission' | 'admin-import';

/** A public LinkedIn post tagged #DevWeekends, shown on /feed once approved. */
export interface ILinkedInPost extends Document {
  /** LinkedIn activity ID, unique per post */
  activityId: string;
  url: string;
  author: string;
  handle: string;
  title: string;
  /** Search-result snippet, not the full post body. Often empty. */
  excerpt: string;
  topic: string;
  tags: string[];
  postedAt?: Date;
  source: LinkedInPostSource;
  status: LinkedInPostStatus;
  /** When the post's own LinkedIn text was checked for a Dev Weekends mention, or an admin approved it by hand */
  checkedAt?: Date;
  /** Why the post was hidden automatically, shown in the admin */
  hiddenReason: string;
  createdAt: Date;
  updatedAt: Date;
}

const LinkedInPostSchema = new Schema<ILinkedInPost>(
  {
    activityId: { type: String, required: true, unique: true, trim: true },
    url: { type: String, required: true, trim: true },
    author: { type: String, required: true, trim: true },
    handle: { type: String, trim: true, default: '' },
    title: { type: String, trim: true, maxlength: 160, default: 'Community update' },
    excerpt: { type: String, trim: true, maxlength: 360, default: '' },
    topic: { type: String, trim: true, default: 'community' },
    tags: { type: [String], default: [] },
    postedAt: { type: Date },
    source: {
      type: String,
      enum: ['seed', 'olostep-search-index', 'community-submission', 'admin-import'],
      default: 'olostep-search-index',
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'hidden'],
      default: 'pending',
      index: true,
    },
    checkedAt: { type: Date },
    hiddenReason: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

LinkedInPostSchema.index({ status: 1, postedAt: -1 });

export const LinkedInPost =
  defineModel<ILinkedInPost>('LinkedInPost', LinkedInPostSchema);
