/**
 * Socket Context
 * 
 * React Context for managing Socket.io connection.
 * Context API allows us to share Socket.io instance across all components
 * without prop drilling.
 */

import { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

// Create context
const SocketContext = createContext(null);

/**
 * SocketProvider Component
 * 
 * Provides Socket.io connection to all child components.
 * Manages connection lifecycle and provides socket instance.
 */
export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Connect to Socket.io server
    // Socket.io uses WebSockets for real-time bidirectional communication
    const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';
    const newSocket = io(socketUrl, {
      transports: ['websocket', 'polling'], // Fallback to polling if WebSocket fails
      reconnection: true, // Automatically reconnect if connection drops
      reconnectionDelay: 1000,
      reconnectionAttempts: 5
    });

    // Connection event handlers
    newSocket.on('connect', () => {
      console.log('✅ Connected to server via Socket.io');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    // Store socket instance
    setSocket(newSocket);

    // Cleanup: disconnect when component unmounts
    return () => {
      newSocket.close();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

/**
 * Custom hook to use Socket context
 * Makes it easy to access socket in any component
 */
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within SocketProvider');
  }
  return context;
};

