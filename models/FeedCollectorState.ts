import mongoose, { Schema } from 'mongoose';
import { defineModel } from '@/lib/model';

/** Where the LinkedIn feed collector stopped in its search list, so each run searches new ground */
interface IFeedCollectorState {
  _id: string;
  cursor: number;
}

const FeedCollectorStateSchema = new Schema<IFeedCollectorState>(
  {
    _id: { type: String, required: true },
    cursor: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const FeedCollectorState =
  defineModel<IFeedCollectorState>('FeedCollectorState', FeedCollectorStateSchema);
