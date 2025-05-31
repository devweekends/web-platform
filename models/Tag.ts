import mongoose, { Schema, Document } from 'mongoose';

export interface ITag extends Document {
  name: string;
  description?: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

const TagSchema = new Schema<ITag>(
  {
    name: {
      type: String,
      required: [true, 'Tag name is required'],
      unique: true,
      trim: true,
      maxlength: [50, 'Tag name cannot exceed 50 characters'],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, 'Tag description cannot exceed 200 characters'],
    },
    color: {
      type: String,
      required: [true, 'Tag color is required'],
      default: '#3b82f6', // Default blue color
      validate: {
        validator: function(color: string) {
          // Validate hex color format
          return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color);
        },
        message: 'Color must be a valid hex color code'
      }
    }
  },
  {
    timestamps: true,
  }
);

export const Tag = mongoose.models.Tag || mongoose.model<ITag>('Tag', TagSchema); 