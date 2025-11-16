# Setup Guide - Smart Log Management System

This guide will walk you through setting up and running the complete Smart Log Management System step by step.

## 📋 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (local installation or MongoDB Atlas account) - [Download](https://www.mongodb.com/try/download/community) or [Atlas](https://www.mongodb.com/cloud/atlas)
- **npm** or **yarn** (comes with Node.js)
- **Git** (optional, for version control)

## 🏗️ Project Structure Overview

```
smart-log-management/
├── backend/              # Node.js + Express + MongoDB + Socket.io
│   ├── src/
│   │   ├── config/      # Database, Socket.io configuration
│   │   ├── controllers/ # Business logic
│   │   ├── models/      # MongoDB schemas (Log, User)
│   │   ├── routes/      # API route definitions
│   │   ├── utils/       # Utility functions (Priority Queue)
│   │   └── server.js    # Main server file
│   └── package.json
│
├── frontend/            # React + Vite + Tailwind + Recharts
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── context/     # React Context (Socket.io)
│   │   ├── pages/       # Page components
│   │   ├── services/    # API service functions
│   │   └── App.jsx      # Main app component
│   └── package.json
│
├── iot-simulator/       # Simulated IoT devices
│   ├── src/
│   │   └── index.js     # Simulator script
│   └── package.json
│
└── docker/              # Docker configuration (optional)
```

## 🚀 Step-by-Step Setup

### Step 1: MongoDB Setup

#### Option A: Local MongoDB

1. Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Start MongoDB service:
   ```bash
   # On macOS (using Homebrew)
   brew services start mongodb-community
   
   # On Linux
   sudo systemctl start mongod
   
   # On Windows
   # MongoDB should start automatically as a service
   ```

#### Option B: MongoDB Atlas (Cloud - Recommended for beginners)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (free tier is fine)
4. Get your connection string:
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)

### Step 2: Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This installs:
   - `express` - Web framework
   - `mongoose` - MongoDB ODM
   - `socket.io` - Real-time communication
   - `dotenv` - Environment variables
   - `bcryptjs` - Password hashing
   - `jsonwebtoken` - JWT authentication
   - And more...

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   # For local MongoDB:
   MONGODB_URI=mongodb://localhost:27017/smart-logs
   
   # OR for MongoDB Atlas:
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/smart-logs
   
   PORT=5000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   CORS_ORIGIN=http://localhost:5173
   ```

4. **Start the backend server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   ✅ Connected to MongoDB
   🚀 Server running on port 5000
   📡 Socket.io ready for connections
   ```

### Step 3: Frontend Setup

1. **Open a new terminal and navigate to frontend:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   
   This installs:
   - `react` & `react-dom` - React library
   - `vite` - Fast build tool
   - `tailwindcss` - CSS framework
   - `recharts` - Chart library
   - `axios` - HTTP client
   - `socket.io-client` - Socket.io client
   - And more...

3. **Start the frontend development server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   VITE v5.0.8  ready in 500 ms
   ➜  Local:   http://localhost:5173/
   ```

4. **Open your browser:**
   Navigate to `http://localhost:5173`

   You should see the dashboard, but it will be empty until we start generating logs.

### Step 4: IoT Simulator Setup

1. **Open another terminal and navigate to iot-simulator:**
   ```bash
   cd iot-simulator
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure (optional):**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` if needed (defaults are usually fine):
   ```env
   API_URL=http://localhost:5000/api
   INTERVAL_MS=3000
   DEVICE_COUNT=3
   ```

4. **Start the simulator:**
   ```bash
   npm start
   ```
   
   You should see:
   ```
   🚀 Starting IoT Log Simulator...
   📡 API URL: http://localhost:5000/api
   ⏱️  Interval: 3000ms
   📱 Devices: 3
      IoT-Sensor-001, IoT-Sensor-002, IoT-Sensor-003
   
   📊 Sending logs...
   ✅ [IoT-Sensor-001] Log sent: ...
   ```

5. **Watch the magic happen!**
   - Go back to your browser (http://localhost:5173)
   - You should see logs appearing in real-time!
   - Charts will update automatically
   - Critical logs will show notifications

## 🎯 What Each Component Does

### Backend (`backend/`)
- **Express Server**: Handles HTTP requests
- **MongoDB**: Stores logs and user data
- **Socket.io**: Broadcasts real-time updates to all connected clients
- **Routes**: `/api/logs` and `/api/users` endpoints
- **Models**: Log and User schemas with validation
- **Controllers**: Business logic for creating, fetching, and managing logs

### Frontend (`frontend/`)
- **React**: UI framework
- **Vite**: Fast development server and build tool
- **Tailwind CSS**: Utility-first CSS for styling
- **Recharts**: Beautiful charts for data visualization
- **Socket.io Client**: Listens for real-time updates
- **Axios**: Makes API calls to backend

### IoT Simulator (`iot-simulator/`)
- Simulates multiple IoT devices
- Generates realistic log data
- Sends logs to backend periodically
- Demonstrates how real devices would interact with the system

## 🔍 Testing the System

### Test API Endpoints

1. **Create a log manually:**
   ```bash
   curl -X POST http://localhost:5000/api/logs \
     -H "Content-Type: application/json" \
     -d '{
       "message": "Test log message",
       "level": "info",
       "source": "Manual-Test",
       "category": "application"
     }'
   ```

2. **Get all logs:**
   ```bash
   curl http://localhost:5000/api/logs
   ```

3. **Get statistics:**
   ```bash
   curl http://localhost:5000/api/logs/stats
   ```

### Test Real-time Updates

1. Start backend, frontend, and simulator
2. Open the dashboard in your browser
3. Watch logs appear in real-time as the simulator sends them
4. Try filtering by level, source, or category
5. Create a log with level "critical" to see the notification toast

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error: "MongoServerError: Authentication failed"**
- Check your MongoDB connection string
- Make sure username/password are correct (for Atlas)
- Ensure your IP is whitelisted in Atlas

**Error: "MongooseServerSelectionError: connect ECONNREFUSED"**
- Make sure MongoDB is running locally
- Check if MongoDB is on port 27017
- Try: `mongosh` to test MongoDB connection

### Backend Issues

**Error: "Port 5000 already in use"**
- Change PORT in `.env` to a different number (e.g., 5001)
- Or stop the process using port 5000

**Error: "Cannot find module"**
- Run `npm install` again in the backend directory
- Delete `node_modules` and `package-lock.json`, then `npm install`

### Frontend Issues

**Error: "Failed to fetch"**
- Make sure backend is running on port 5000
- Check CORS_ORIGIN in backend `.env` matches frontend URL
- Check browser console for detailed error

**Socket.io connection fails**
- Ensure backend Socket.io is running
- Check VITE_SOCKET_URL in frontend (if using .env)
- Verify firewall isn't blocking WebSocket connections

### IoT Simulator Issues

**Error: "ECONNREFUSED"**
- Make sure backend is running first
- Check API_URL in simulator `.env`
- Verify backend is accessible at the URL

## 📚 Key Concepts Explained

### 1. **Real-time Communication (Socket.io)**
- WebSockets allow bidirectional communication
- When a new log is created, server broadcasts it to all clients
- No need to refresh the page to see new logs

### 2. **Priority Queue (DSA)**
- Logs are classified by priority (1 = highest, 5 = lowest)
- Priority queues ensure critical logs are processed first
- Implemented in `backend/src/utils/priorityQueue.js`

### 3. **Hashing/Indexing**
- MongoDB indexes (defined in Log schema) enable fast queries
- Indexes are like book indexes - they help find data quickly
- Used for filtering by level, source, category, etc.

### 4. **JWT Authentication**
- JSON Web Tokens for secure user authentication
- Tokens are stateless and don't require server-side sessions
- Used for role-based access control (Admin/User)

## 🎓 Next Steps

Now that you have the system running, you can:

1. **Add Authentication UI**: Create login/register pages
2. **Implement Search**: Add full-text search functionality
3. **Add More Visualizations**: Create time-series charts
4. **Enhance Filtering**: Add date range filters
5. **Add Export**: Export logs to CSV/JSON
6. **Deploy**: Use Docker or cloud platforms (Heroku, Vercel, etc.)

## 📖 Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Socket.io Documentation](https://socket.io/docs/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Recharts Documentation](https://recharts.org/)

## ✅ Summary

You've successfully set up:
- ✅ Backend API with Express, MongoDB, and Socket.io
- ✅ React frontend with real-time updates
- ✅ IoT simulator for generating test logs
- ✅ Complete folder structure
- ✅ DSA implementations (Priority Queue, Hashing/Indexing)

The system is now ready to collect, classify, and visualize logs in real-time!

