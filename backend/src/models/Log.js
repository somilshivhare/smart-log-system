/**
 * Log Model (Schema)
 * 
 * This defines the structure of log documents in MongoDB.
 * Mongoose schemas help us validate data and provide a consistent structure.
 * 
 * We'll use DSA techniques like priority queues (via priority field) and
 * hashing (for efficient searching) in our controllers.
 */

import mongoose from 'mongoose';

const logSchema = new mongoose.Schema({
  // Basic log information
  message: {
    type: String,
    required: [true, 'Log message is required'],
    trim: true
  },
  
  // Log classification
  level: {
    type: String,
    enum: ['info', 'warning', 'error', 'critical'],
    default: 'info',
    required: true
  },
  
  // Priority for DSA priority queue (1 = highest, 5 = lowest)
  priority: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    default: 3,
    required: true
  },
  
  // Source of the log (IoT device, API, system, etc.)
  source: {
    type: String,
    required: [true, 'Log source is required'],
    trim: true
  },
  
  // Category for better organization
  category: {
    type: String,
    enum: ['system', 'security', 'network', 'application', 'database', 'iot'],
    default: 'application'
  },
  
  // Additional metadata
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  
  // IP address or device identifier
  ipAddress: {
    type: String,
    trim: true
  },
  
  // User who created the log (if applicable)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  
  // Timestamps
  timestamp: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  collection: 'logs' // Explicit collection name
});

// Indexes for efficient querying (hashing technique for fast lookups)
// Indexes are like database indexes in books - they help find data quickly
logSchema.index({ level: 1, timestamp: -1 }); // Compound index for filtering by level and time
logSchema.index({ source: 1 }); // Index for filtering by source
logSchema.index({ priority: 1, timestamp: -1 }); // Index for priority queue operations
logSchema.index({ category: 1 }); // Index for category filtering
logSchema.index({ timestamp: -1 }); // Index for time-based queries

// Virtual for checking if log is critical
logSchema.virtual('isCritical').get(function() {
  return this.level === 'critical' || this.priority === 1;
});

// Method to get log summary
logSchema.methods.getSummary = function() {
  return {
    id: this._id,
    message: this.message,
    level: this.level,
    priority: this.priority,
    source: this.source,
    timestamp: this.timestamp
  };
};

// Pre-save hook to automatically set priority based on level
logSchema.pre('save', function(next) {
  // Map log levels to priorities (DSA: priority queue concept)
  const levelPriorityMap = {
    'critical': 1,
    'error': 2,
    'warning': 3,
    'info': 4
  };
  
  // If priority wasn't explicitly set, derive it from level
  if (!this.isModified('priority') && levelPriorityMap[this.level]) {
    this.priority = levelPriorityMap[this.level];
  }
  
  next();
});

const Log = mongoose.model('Log', logSchema);

export default Log;

