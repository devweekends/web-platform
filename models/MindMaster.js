import mongoose from 'mongoose';

// Define validator to handle potential undefined values
const stringWithDefault = {
  type: String,
  default: '',
  set: (v) => v === undefined || v === null ? '' : v.toString()
};

const mindMasterSchema = new mongoose.Schema({
  // Talk of the week
  talkOfTheWeek: {
    title: stringWithDefault,
    bio: stringWithDefault,
    videoUrl: stringWithDefault,
    youtubeEmbedId: stringWithDefault,
    isPlaylist: { type: Boolean, default: false },
    link: stringWithDefault,
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
  },
  
  // Talk of the month
  talkOfTheMonth: {
    title: stringWithDefault,
    bio: stringWithDefault,
    videoUrl: stringWithDefault,
    youtubeEmbedId: stringWithDefault,
    isPlaylist: { type: Boolean, default: false },
    link: stringWithDefault,
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
  },
  
  // Book of the week
  bookOfTheWeek: {
    title: stringWithDefault,
    author: stringWithDefault,
    bio: stringWithDefault,
    link: stringWithDefault,
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
  },
  
  // Book of the month
  bookOfTheMonth: {
    title: stringWithDefault,
    author: stringWithDefault,
    bio: stringWithDefault,
    link: stringWithDefault,
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: false }
  },
  
  // Recommended talks - collection of YouTube talks or playlists
  recommendedTalks: [{
    title: stringWithDefault,
    bio: stringWithDefault,
    youtubeEmbedId: stringWithDefault,
    isPlaylist: { type: Boolean, default: false },
    date: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true }
  }],
  
  // Common fields
  createdBy: { type: String, default: 'Admin' },
  lastModifiedBy: { type: String, default: 'Admin' },
  lastUpdated: { type: Date, default: Date.now }
}, { 
  timestamps: true,
  // Add strict: false to allow fields not defined in the schema
  strict: false,
  // Add this to ensure empty values are handled properly
  minimize: false
});

// Automatically update the lastUpdated field on save
mindMasterSchema.pre('save', function(next) {
  this.lastUpdated = new Date();
  next();
});

// Create a clean method to remove circular references and prepare for JSON
mindMasterSchema.methods.toJSON = function() {
  const obj = this.toObject();
  return obj;
};

export const MindMaster = mongoose.models.MindMaster || mongoose.model('MindMaster', mindMasterSchema); 