import mongoose from 'mongoose';
import { defineModel } from '@/lib/model';

const ResourceItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  href: { type: String, default: '' },
  description: { type: String, default: '' },
  internalSlug: { type: String, default: '' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { _id: true, timestamps: true });

const ResourceCategorySchema = new mongoose.Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  order: { type: Number, default: 0 },
  items: { type: [ResourceItemSchema], default: [] },
  isActive: { type: Boolean, default: true },
}, { _id: true });

const ResourceCatalogSchema = new mongoose.Schema({
  categories: { type: [ResourceCategorySchema], default: [] },
  createdBy: { type: String, default: 'Admin' },
  lastModifiedBy: { type: String, default: 'Admin' },
  lastUpdated: { type: Date, default: Date.now },
}, { timestamps: true });

export interface ResourceCatalogDoc extends mongoose.Document {}

export const ResourceCatalog = defineModel<ResourceCatalogDoc>('ResourceCatalog', ResourceCatalogSchema);


