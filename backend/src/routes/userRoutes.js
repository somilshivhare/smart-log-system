/**
 * User Routes
 * 
 * Defines all API endpoints related to user authentication and management.
 */

import express from 'express';
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById
} from '../controllers/userController.js';

const router = express.Router();

// POST /api/users/register - Register a new user
router.post('/register', registerUser);

// POST /api/users/login - Login user
router.post('/login', loginUser);

// GET /api/users - Get all users (admin only - will add auth later)
router.get('/', getUsers);

// GET /api/users/:id - Get user by ID
router.get('/:id', getUserById);

export default router;

