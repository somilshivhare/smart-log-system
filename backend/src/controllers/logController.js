/**
 * Log Controller
 * 
 * Contains all business logic for handling log-related operations.
 * Uses DSA techniques like priority queues and hashing for efficient operations.
 */

import Log from '../models/Log.js';
import { broadcastLog, broadcastCriticalAlert } from '../config/socket.js';

/**
 * Create a new log
 * POST /api/logs
 * 
 * This function:
 * 1. Validates the incoming log data
 * 2. Creates a new log document in MongoDB
 * 3. Broadcasts the log via Socket.io for real-time updates
 * 4. Sends critical alerts if the log is critical
 */
export const createLog = async (req, res) => {
  try {
    const { message, level, source, category, metadata, ipAddress } = req.body;

    // Validate required fields
    if (!message || !source) {
      return res.status(400).json({
        success: false,
        message: 'Message and source are required'
      });
    }

    // Create log document
    const log = new Log({
      message,
      level: level || 'info',
      source,
      category: category || 'application',
      metadata: metadata || {},
      ipAddress: ipAddress || req.ip
    });

    // Save to database
    await log.save();

    // Broadcast to all connected clients via Socket.io
    const logData = log.toObject();
    broadcastLog(logData);

    // If critical, also broadcast as alert
    if (log.level === 'critical' || log.priority === 1) {
      broadcastCriticalAlert(logData);
    }

    res.status(201).json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error('Error creating log:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating log',
      error: error.message
    });
  }
};

/**
 * Get all logs with filtering and pagination
 * GET /api/logs
 * 
 * Query parameters:
 * - level: Filter by log level (info, warning, error, critical)
 * - source: Filter by source
 * - category: Filter by category
 * - priority: Filter by priority (1-5)
 * - page: Page number (default: 1)
 * - limit: Items per page (default: 50)
 * - sortBy: Sort field (default: timestamp)
 * - sortOrder: asc or desc (default: desc)
 * 
 * Uses MongoDB indexes (hashing technique) for efficient queries
 */
export const getLogs = async (req, res) => {
  try {
    const {
      level,
      source,
      category,
      priority,
      page = 1,
      limit = 50,
      sortBy = 'timestamp',
      sortOrder = 'desc'
    } = req.query;

    // Build filter object (hashing/object-based filtering)
    const filter = {};
    if (level) filter.level = level;
    if (source) filter.source = { $regex: source, $options: 'i' }; // Case-insensitive search
    if (category) filter.category = category;
    if (priority) filter.priority = parseInt(priority);

    // Calculate pagination
    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    // Query database with filter, pagination, and sorting
    // MongoDB uses indexes (defined in schema) for fast queries
    const logs = await Log.find(filter)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .populate('userId', 'username email') // Populate user info if exists
      .lean(); // Return plain JavaScript objects (faster)

    // Get total count for pagination info
    const total = await Log.countDocuments(filter);

    res.json({
      success: true,
      data: logs,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        pages: Math.ceil(total / parseInt(limit))
      }
    });
  } catch (error) {
    console.error('Error fetching logs:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching logs',
      error: error.message
    });
  }
};

/**
 * Get log by ID
 * GET /api/logs/:id
 */
export const getLogById = async (req, res) => {
  try {
    const log = await Log.findById(req.params.id)
      .populate('userId', 'username email');

    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Log not found'
      });
    }

    res.json({
      success: true,
      data: log
    });
  } catch (error) {
    console.error('Error fetching log:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching log',
      error: error.message
    });
  }
};

/**
 * Delete a log
 * DELETE /api/logs/:id
 * 
 * Note: In production, add authentication middleware to restrict this to admins
 */
export const deleteLog = async (req, res) => {
  try {
    const log = await Log.findByIdAndDelete(req.params.id);

    if (!log) {
      return res.status(404).json({
        success: false,
        message: 'Log not found'
      });
    }

    res.json({
      success: true,
      message: 'Log deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting log:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting log',
      error: error.message
    });
  }
};

/**
 * Get log statistics
 * GET /api/logs/stats
 * 
 * Returns aggregated statistics about logs.
 * Uses MongoDB aggregation pipeline for efficient data processing.
 */
export const getLogStats = async (req, res) => {
  try {
    // Aggregate logs by level (DSA: grouping/hashing concept)
    const statsByLevel = await Log.aggregate([
      {
        $group: {
          _id: '$level',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Aggregate logs by category
    const statsByCategory = await Log.aggregate([
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);

    // Get total count
    const totalLogs = await Log.countDocuments();

    // Get logs from last 24 hours
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const recentLogs = await Log.countDocuments({
      timestamp: { $gte: last24Hours }
    });

    // Get critical logs count
    const criticalLogs = await Log.countDocuments({
      $or: [{ level: 'critical' }, { priority: 1 }]
    });

    res.json({
      success: true,
      data: {
        total: totalLogs,
        recent24Hours: recentLogs,
        critical: criticalLogs,
        byLevel: statsByLevel,
        byCategory: statsByCategory
      }
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching statistics',
      error: error.message
    });
  }
};

