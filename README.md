# Smart Log Management System for E-Governance

A comprehensive real-time log management system built with React, Node.js, Express, MongoDB, and Socket.io.

## Project Structure

```
smart-log-management/
├── backend/          # Node.js + Express + MongoDB + Socket.io API
├── frontend/         # React + Vite + Tailwind + Recharts
├── iot-simulator/    # Simulated IoT device log generator
└── docker/           # Docker configuration files
```

## Features

- Real-time log collection and display
- Automatic log classification using DSA techniques (priority queues, hashing)
- JWT-based authentication
- Role-based access control (Admin/User)
- Search and filtering
- Secure log storage
- Instant notifications for critical logs
- Data visualization with Recharts

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Backend Setup:**
   ```bash
   cd backend
   npm install
   cp .env.example .env
   # Edit .env with your MongoDB connection string
   npm run dev
   ```

2. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

3. **IoT Simulator:**
   ```bash
   cd iot-simulator
   npm install
   npm start
   ```

## Tech Stack

- **Backend:** Node.js, Express, MongoDB, Mongoose, Socket.io, JWT
- **Frontend:** React, Vite, Tailwind CSS, Recharts, Axios, Socket.io-client
- **IoT Simulator:** Node.js

## 📚 Documentation

- **[QUICK_START.md](./QUICK_START.md)** - Get started in 5 minutes
- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup instructions with troubleshooting
- **[PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md)** - Complete architecture and feature overview
- **[STEP_BY_STEP_EXPLANATION.md](./STEP_BY_STEP_EXPLANATION.md)** - Learn why each component was built
- **[VERIFICATION_CHECKLIST.md](./VERIFICATION_CHECKLIST.md)** - Verify your setup is correct

## 🎓 Learning Resources

This project is designed for learning. Each file includes detailed comments explaining:
- What the code does
- Why it's structured this way
- How it fits into the overall system
- DSA concepts applied (Priority Queue, Hashing/Indexing)

## 🚀 Quick Start

1. **Install dependencies** in each folder (`backend`, `frontend`, `iot-simulator`)
2. **Configure MongoDB** connection in `backend/.env`
3. **Start backend**: `cd backend && npm run dev`
4. **Start frontend**: `cd frontend && npm run dev`
5. **Start simulator**: `cd iot-simulator && npm start`
6. **Open browser**: http://localhost:5173

See [QUICK_START.md](./QUICK_START.md) for detailed instructions.

