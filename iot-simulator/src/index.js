/**
 * IoT Log Simulator
 * 
 * This script simulates multiple IoT devices sending logs to the backend.
 * It periodically generates fake log data and sends it via HTTP POST requests.
 * 
 * This demonstrates how real IoT devices would send logs to the system.
 */

import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

// Configuration
const API_URL = process.env.API_URL || 'http://localhost:5000/api';
const INTERVAL_MS = parseInt(process.env.INTERVAL_MS) || 3000; // Send logs every 3 seconds
const DEVICE_COUNT = parseInt(process.env.DEVICE_COUNT) || 3; // Number of simulated devices

// Device names
const DEVICES = [
  'IoT-Sensor-001',
  'IoT-Sensor-002',
  'IoT-Sensor-003',
  'Security-Camera-001',
  'Temperature-Sensor-001',
  'Motion-Detector-001'
].slice(0, DEVICE_COUNT);

// Log levels with weights (for realistic distribution)
const LOG_LEVELS = [
  { level: 'info', weight: 60 },
  { level: 'warning', weight: 25 },
  { level: 'error', weight: 10 },
  { level: 'critical', weight: 5 }
];

// Categories
const CATEGORIES = ['system', 'security', 'network', 'application', 'database', 'iot'];

// Sample log messages
const LOG_MESSAGES = {
  info: [
    'Device initialized successfully',
    'Data synchronization completed',
    'Heartbeat signal received',
    'Configuration updated',
    'Normal operation resumed',
    'Connection established',
    'Data packet received',
    'System check passed'
  ],
  warning: [
    'High memory usage detected',
    'Network latency increased',
    'Battery level below 30%',
    'Unusual activity pattern detected',
    'Connection timeout occurred',
    'Data queue approaching limit',
    'Temperature slightly elevated'
  ],
  error: [
    'Failed to connect to server',
    'Data transmission error',
    'Sensor reading failed',
    'Authentication error',
    'Database connection lost',
    'Invalid data format received',
    'Service unavailable'
  ],
  critical: [
    'System failure detected',
    'Security breach attempt',
    'Critical sensor malfunction',
    'Emergency shutdown required',
    'Data corruption detected',
    'Unauthorized access attempt',
    'System overload - immediate action needed'
  ]
};

/**
 * Select a random log level based on weights
 * This creates a realistic distribution (more info logs, fewer critical)
 */
function getRandomLogLevel() {
  const random = Math.random() * 100;
  let cumulative = 0;
  
  for (const item of LOG_LEVELS) {
    cumulative += item.weight;
    if (random <= cumulative) {
      return item.level;
    }
  }
  
  return 'info'; // Fallback
}

/**
 * Get a random message for a given log level
 */
function getRandomMessage(level) {
  const messages = LOG_MESSAGES[level] || LOG_MESSAGES.info;
  return messages[Math.floor(Math.random() * messages.length)];
}

/**
 * Generate a random log entry
 */
function generateLog(deviceName) {
  const level = getRandomLogLevel();
  const message = getRandomMessage(level);
  const category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
  
  // Generate random metadata
  const metadata = {
    deviceId: deviceName,
    firmwareVersion: `v${Math.floor(Math.random() * 3) + 1}.${Math.floor(Math.random() * 10)}`,
    batteryLevel: Math.floor(Math.random() * 100),
    signalStrength: Math.floor(Math.random() * 100),
    temperature: (20 + Math.random() * 15).toFixed(2)
  };

  return {
    message,
    level,
    source: deviceName,
    category,
    metadata,
    ipAddress: `192.168.1.${Math.floor(Math.random() * 255)}`
  };
}

/**
 * Send a log to the backend API
 */
async function sendLog(deviceName) {
  try {
    const logData = generateLog(deviceName);
    
    const response = await axios.post(`${API_URL}/logs`, logData);
    
    console.log(`✅ [${deviceName}] Log sent:`, {
      level: logData.level,
      message: logData.message.substring(0, 50) + '...'
    });
    
    return response.data;
  } catch (error) {
    console.error(`❌ [${deviceName}] Error sending log:`, error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

/**
 * Main simulation function
 * Sends logs from all devices periodically
 */
function startSimulation() {
  console.log('🚀 Starting IoT Log Simulator...');
  console.log(`📡 API URL: ${API_URL}`);
  console.log(`⏱️  Interval: ${INTERVAL_MS}ms`);
  console.log(`📱 Devices: ${DEVICES.length}`);
  console.log(`   ${DEVICES.join(', ')}`);
  console.log('\n📊 Sending logs...\n');

  // Send initial logs from all devices
  DEVICES.forEach((device) => {
    sendLog(device);
  });

  // Set up interval to send logs periodically
  // Each device sends a log at different intervals to simulate real-world behavior
  DEVICES.forEach((device, index) => {
    setInterval(() => {
      sendLog(device);
    }, INTERVAL_MS + (index * 500)); // Stagger intervals slightly
  });
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n\n🛑 Stopping IoT Simulator...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🛑 Stopping IoT Simulator...');
  process.exit(0);
});

// Start the simulation
startSimulation();

