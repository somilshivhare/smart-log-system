/**
 * Dashboard Page
 * 
 * Main dashboard component that displays logs in real-time.
 * Features:
 * - Real-time log updates via Socket.io
 * - Log table with filtering
 * - Data visualization with Recharts
 * - Search and filter functionality
 */

import { useState, useEffect } from 'react';
import { useSocket } from '../context/SocketContext';
import { getLogs, getLogStats } from '../services/api';
import LogTable from '../components/LogTable';
import LogStats from '../components/LogStats';
import LogFilters from '../components/LogFilters';
import NotificationToast from '../components/NotificationToast';

const Dashboard = () => {
  const { socket, isConnected } = useSocket();
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    level: '',
    source: '',
    category: '',
    page: 1,
    limit: 50
  });
  const [notification, setNotification] = useState(null);

  // Fetch logs from API
  const fetchLogs = async () => {
    try {
      setLoading(true);
      const response = await getLogs(filters);
      setLogs(response.data || []);
    } catch (error) {
      console.error('Error fetching logs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch statistics
  const fetchStats = async () => {
    try {
      const response = await getLogStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  // Initial data load
  useEffect(() => {
    fetchLogs();
    fetchStats();
  }, [filters]);

  // Listen for real-time log updates via Socket.io
  useEffect(() => {
    if (!socket) return;

    // Listen for new logs
    const handleNewLog = (logData) => {
      // Add new log to the beginning of the array
      setLogs((prevLogs) => [logData, ...prevLogs]);
      
      // Update stats
      fetchStats();
    };

    // Listen for critical alerts
    const handleCriticalAlert = (logData) => {
      // Show notification for critical logs
      setNotification({
        type: 'critical',
        message: `Critical Alert: ${logData.message}`,
        log: logData
      });
      
      // Auto-dismiss after 5 seconds
      setTimeout(() => {
        setNotification(null);
      }, 5000);
    };

    // Register event listeners
    socket.on('new-log', handleNewLog);
    socket.on('critical-alert', handleCriticalAlert);

    // Cleanup: remove listeners when component unmounts
    return () => {
      socket.off('new-log', handleNewLog);
      socket.off('critical-alert', handleCriticalAlert);
    };
  }, [socket]);

  // Handle filter changes
  const handleFilterChange = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 1 }));
  };

  return (
    <div className="space-y-6">
      {/* Connection Status */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`h-3 w-3 rounded-full ${
              isConnected ? 'bg-green-500' : 'bg-red-500'
            }`}
          />
          <span className="text-sm text-gray-600">
            {isConnected ? 'Connected' : 'Disconnected'}
          </span>
        </div>
      </div>

      {/* Statistics */}
      {stats && <LogStats stats={stats} />}

      {/* Filters */}
      <LogFilters filters={filters} onFilterChange={handleFilterChange} />

      {/* Log Table */}
      <LogTable logs={logs} loading={loading} onRefresh={fetchLogs} />

      {/* Notification Toast */}
      {notification && (
        <NotificationToast
          notification={notification}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
};

export default Dashboard;

