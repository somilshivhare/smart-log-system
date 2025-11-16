# IoT Log Simulator

Simulates multiple IoT devices sending logs to the Smart Log Management System backend.

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```

3. Make sure the backend server is running on `http://localhost:5000`

4. Start the simulator:
   ```bash
   npm start
   ```

## Configuration

- `API_URL`: Backend API endpoint (default: `http://localhost:5000/api`)
- `INTERVAL_MS`: Time between log sends in milliseconds (default: 3000)
- `DEVICE_COUNT`: Number of simulated devices (default: 3)

## Features

- Simulates multiple IoT devices
- Generates realistic log data with different levels (info, warning, error, critical)
- Sends logs periodically to the backend
- Includes metadata like device ID, battery level, temperature, etc.

