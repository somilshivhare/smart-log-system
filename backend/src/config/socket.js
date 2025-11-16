/**
 * Socket.io Configuration
 * 
 * This file handles real-time communication using WebSockets.
 * Socket.io allows bidirectional communication between server and clients.
 * 
 * When a new log is created, we broadcast it to all connected clients
 * so they see updates instantly without refreshing.
 */

/**
 * Initialize Socket.io event handlers
 * @param {Server} io - Socket.io server instance
 */
export const initializeSocket = (io) => {
  io.on('connection', (socket) => {
    console.log(`✅ Client connected: ${socket.id}`);

    // Handle client disconnection
    socket.on('disconnect', () => {
      console.log(`❌ Client disconnected: ${socket.id}`);
    });

    // Optional: Handle custom events from clients
    socket.on('join-room', (room) => {
      socket.join(room);
      console.log(`Client ${socket.id} joined room: ${room}`);
    });
  });

  // Make io instance available globally for broadcasting
  // We'll use this in controllers to emit events
  global.io = io;
};

/**
 * Broadcast a new log to all connected clients
 * @param {Object} logData - The log data to broadcast
 */
export const broadcastLog = (logData) => {
  if (global.io) {
    global.io.emit('new-log', logData);
    console.log('📡 Broadcasted new log to all clients');
  }
};

/**
 * Broadcast a critical log alert
 * @param {Object} logData - The critical log data
 */
export const broadcastCriticalAlert = (logData) => {
  if (global.io) {
    global.io.emit('critical-alert', logData);
    console.log('🚨 Broadcasted critical alert to all clients');
  }
};

