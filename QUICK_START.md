# Quick Start Guide

Get the Smart Log Management System running in 5 minutes!

## ⚡ Quick Setup (3 Steps)

### 1. Install Dependencies

Open 3 terminal windows and run:

**Terminal 1 - Backend:**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your MongoDB connection string
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm install
```

**Terminal 3 - IoT Simulator:**
```bash
cd iot-simulator
npm install
```

### 2. Start MongoDB

**Local MongoDB:**
```bash
# macOS
brew services start mongodb-community

# Linux
sudo systemctl start mongod

# Windows - MongoDB should start automatically
```

**OR use MongoDB Atlas (Cloud):**
- Sign up at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create free cluster
- Get connection string
- Add to `backend/.env` as `MONGODB_URI`

### 3. Start All Services

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
✅ Should see: "Server running on port 5000"

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```
✅ Should see: "Local: http://localhost:5173/"

**Terminal 3 - IoT Simulator:**
```bash
cd iot-simulator
npm start
```
✅ Should see: "Starting IoT Log Simulator..."

### 4. Open Browser

Navigate to: **http://localhost:5173**

🎉 You should see logs appearing in real-time!

## 🔍 Verify Everything Works

1. **Backend Health Check:**
   ```bash
   curl http://localhost:5000/api/health
   ```
   Should return: `{"status":"OK","message":"Server is running"}`

2. **Check Logs API:**
   ```bash
   curl http://localhost:5000/api/logs
   ```
   Should return logs array

3. **Dashboard:**
   - Open http://localhost:5173
   - See connection status (green dot = connected)
   - Watch logs appear in real-time
   - See charts update automatically

## 🐛 Common Issues

**"Cannot connect to MongoDB"**
- Make sure MongoDB is running
- Check connection string in `backend/.env`
- For Atlas: Check IP whitelist

**"Port already in use"**
- Change PORT in `backend/.env`
- Or kill process: `lsof -ti:5000 | xargs kill`

**"Module not found"**
- Run `npm install` in that directory
- Delete `node_modules` and reinstall

**Frontend can't connect to backend**
- Check backend is running on port 5000
- Check CORS_ORIGIN in backend `.env` matches frontend URL

## 📚 Next Steps

- Read `SETUP_GUIDE.md` for detailed explanations
- Read `PROJECT_SUMMARY.md` for architecture overview
- Explore the code - it's well-commented for learning!

## 🎯 Test Real-time Updates

1. Start all services
2. Open dashboard in browser
3. Watch logs appear automatically
4. Try creating a critical log:
   ```bash
   curl -X POST http://localhost:5000/api/logs \
     -H "Content-Type: application/json" \
     -d '{"message":"Test critical log","level":"critical","source":"Manual-Test","category":"system"}'
   ```
5. See notification toast appear!

---

**Need help?** Check `SETUP_GUIDE.md` for detailed troubleshooting.



