/**
 * Main App Component
 * 
 * This is the root component of our React application.
 * It sets up routing and provides the main layout.
 */

import { useState, useEffect } from 'react';
import Dashboard from './pages/Dashboard';
import { SocketProvider } from './context/SocketContext';
import './App.css';

function App() {
  return (
    <SocketProvider>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Smart Log Management System
            </h1>
            <p className="text-sm text-gray-600 mt-1">
              Real-time E-Governance Log Monitoring
            </p>
          </div>
        </header>
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Dashboard />
        </main>
      </div>
    </SocketProvider>
  );
}

export default App;

