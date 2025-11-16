/**
 * Log Routes
 * 
 * Defines all API endpoints related to logs.
 * Routes handle HTTP requests and delegate business logic to controllers.
 */

import express from 'express';
import {
  createLog,
  getLogs,
  getLogById,
  deleteLog,
  getLogStats
} from '../controllers/logController.js';

const router = express.Router();

// POST /api/logs - Create a new log
router.post('/', createLog);

// GET /api/logs - Get all logs with filtering and pagination
router.get('/', getLogs);

// GET /api/logs/stats - Get log statistics
router.get('/stats', getLogStats);

// GET /api/logs/:id - Get a specific log by ID
router.get('/:id', getLogById);

// DELETE /api/logs/:id - Delete a log (admin only - will add auth later)
router.delete('/:id', deleteLog);

export default router;

