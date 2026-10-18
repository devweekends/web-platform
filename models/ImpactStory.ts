import { Connection, Document, Model, Schema } from 'mongoose';

export const IMPACT_PROGRAMS = [
  'fellowship',
  'open-source',
  'turing',
  'alumni',
  'dsoc',
  'mentorship',
  'community',
  'other',
] as const;

export type ImpactProgram = (typeof IMPACT_PROGRAMS)[number];
export type ImpactVisibility = 'internal' | 'public' | 'featured';

export interface IImpactStory extends Document {
  name: string;
  role: string;
  organization?: string;
  email?: string;
  linkedin?: string;
  program: ImpactProgram;
  cohort?: string;
  sponsor?: string;
  before?: string;
  content: string;
  cta?: string;
  videoUrl?: string;
  mediaAttachmentUrl?: string;
  annualEarnings?: string;
  source?: {
    form?: string;
    rowKey?: string;
    submittedAt?: Date;
  };
  imageUrl?: string;
  type: 'text' | 'video';
  consentToPublish: boolean;
  isApproved: boolean;
  visibility: ImpactVisibility;
  featuredRank?: number;
  createdAt: Date;
  updatedAt: Date;
}

const ImpactStorySchema = new Schema<IImpactStory>(
  {
    name: { type: String, required: [true, 'Name is required'], trim: true, maxlength: 120 },
    role: { type: String, required: [true, 'Role is required'], trim: true, maxlength: 160 },
    organization: { type: String, trim: true, maxlength: 160 },
    email: { type: String, trim: true, maxlength: 320 },
    linkedin: { type: String, trim: true, maxlength: 500 },
    program: { type: String, enum: IMPACT_PROGRAMS, required: [true, 'Program is required'] },
    cohort: { type: String, trim: true, maxlength: 100 },
    sponsor: { type: String, trim: true, maxlength: 160 },
    before: { type: String, trim: true, maxlength: 500 },
    content: { type: String, required: [true, 'Story content is required'], trim: true, maxlength: 5000 },
    cta: { type: String, trim: true, maxlength: 500 },
    videoUrl: { type: String, trim: true, maxlength: 500 },
    mediaAttachmentUrl: { type: String, trim: true, maxlength: 1000 },
    annualEarnings: { type: String, trim: true, maxlength: 100 },
    source: {
      form: { type: String, trim: true, maxlength: 160 },
      rowKey: { type: String, trim: true, maxlength: 200 },
      submittedAt: Date,
    },
    imageUrl: { type: String, default: '/avatar.svg', trim: true, maxlength: 500 },
    type: { type: String, enum: ['text', 'video'], default: 'text' },
    consentToPublish: { type: Boolean, required: true, default: false },
    isApproved: { type: Boolean, default: false },
    visibility: { type: String, enum: ['internal', 'public', 'featured'], default: 'internal' },
    featuredRank: { type: Number, min: 0 },
  },
  { timestamps: true },
);

ImpactStorySchema.index({ isApproved: 1, visibility: 1, featuredRank: 1, createdAt: -1 });
ImpactStorySchema.index({ program: 1, createdAt: -1 });
ImpactStorySchema.index(
  { 'source.form': 1, 'source.rowKey': 1 },
  {
    unique: true,
    partialFilterExpression: {
      'source.form': { $exists: true },
      'source.rowKey': { $exists: true },
    },
  },
);

export function getImpactStoryModel(connection: Connection): Model<IImpactStory> {
  return (
    (connection.models.ImpactStory as Model<IImpactStory> | undefined) ||
    connection.model<IImpactStory>('ImpactStory', ImpactStorySchema)
  );
}
