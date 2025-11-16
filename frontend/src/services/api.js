/**
 * API Service
 * 
 * Centralized API client using Axios.
 * Axios is a promise-based HTTP client for making API requests.
 * 
 * This file contains all functions to interact with the backend API.
 */

import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor - runs before every request
// Useful for adding authentication tokens
api.interceptors.request.use(
  (config) => {
    // Get token from localStorage if it exists
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - runs after every response
// Useful for handling errors globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle 401 (unauthorized) - redirect to login
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      // Could redirect to login page here
    }
    return Promise.reject(error);
  }
);

/**
 * Log API Functions
 */

// Get all logs with optional filters
export const getLogs = async (params = {}) => {
  const response = await api.get('/logs', { params });
  return response.data;
};

// Get a single log by ID
export const getLogById = async (id) => {
  const response = await api.get(`/logs/${id}`);
  return response.data;
};

// Create a new log
export const createLog = async (logData) => {
  const response = await api.post('/logs', logData);
  return response.data;
};

// Delete a log
export const deleteLog = async (id) => {
  const response = await api.delete(`/logs/${id}`);
  return response.data;
};

// Get log statistics
export const getLogStats = async () => {
  const response = await api.get('/logs/stats');
  return response.data;
};

/**
 * User API Functions
 */

// Register a new user
export const registerUser = async (userData) => {
  const response = await api.post('/users/register', userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials) => {
  const response = await api.post('/users/login', credentials);
  return response.data;
};

export default api;

