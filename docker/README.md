# Docker Setup

Optional Docker configuration for deploying the Smart Log Management System.

## Prerequisites

- Docker
- Docker Compose

## Usage

1. Build and start all services:
   ```bash
   docker-compose up -d
   ```

2. View logs:
   ```bash
   docker-compose logs -f
   ```

3. Stop all services:
   ```bash
   docker-compose down
   ```

4. Stop and remove volumes (clears database):
   ```bash
   docker-compose down -v
   ```

## Services

- **mongodb**: MongoDB database on port 27017
- **backend**: Express API server on port 5000
- **frontend**: React frontend on port 5173

## Note

For production, update environment variables in `docker-compose.yml` and use proper secrets management.

