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

