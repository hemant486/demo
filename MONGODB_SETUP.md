# MongoDB Setup Guide

## Option 1: Local MongoDB (Recommended for Development)

### macOS Installation:

1. **Install MongoDB using Homebrew:**

```bash
brew tap mongodb/brew
brew install mongodb-community@7.0
```

2. **Start MongoDB:**

```bash
brew services start mongodb-community@7.0
```

3. **Verify MongoDB is running:**

```bash
mongosh
```

4. **Your connection string is already set in backend/.env:**

```
MONGODB_URI=mongodb://localhost:27017/healthcare-portal
```

### Stop MongoDB:

```bash
brew services stop mongodb-community@7.0
```

---

## Option 2: MongoDB Atlas (Cloud - Free Tier)

### Setup Steps:

1. **Go to MongoDB Atlas:**

   - Visit: https://www.mongodb.com/cloud/atlas/register
   - Create a free account

2. **Create a Cluster:**

   - Click "Build a Database"
   - Choose "FREE" tier (M0)
   - Select your preferred region
   - Click "Create Cluster"

3. **Create Database User:**

   - Go to "Database Access"
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Username: `healthcare_admin`
   - Password: Generate a secure password (save it!)
   - User Privileges: "Atlas admin"
   - Click "Add User"

4. **Whitelist Your IP:**

   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your current IP address
   - Click "Confirm"

5. **Get Connection String:**

   - Go to "Database" → "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - It looks like: `mongodb+srv://healthcare_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`

6. **Update backend/.env:**

```env
MONGODB_URI=mongodb+srv://healthcare_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/healthcare-portal?retryWrites=true&w=majority
```

Replace:

- `YOUR_PASSWORD` with your actual password
- `cluster0.xxxxx` with your actual cluster address

---

## Option 3: Docker MongoDB (Alternative)

```bash
# Run MongoDB in Docker
docker run -d -p 27017:27017 --name mongodb mongo:latest

# Stop MongoDB
docker stop mongodb

# Start MongoDB
docker start mongodb
```

---

## Verify Connection

1. **Start your backend:**

```bash
cd backend
npm run dev
```

2. **Look for this message:**

```
MongoDB Connected Successfully
🚀 Server running on port 5000
```

3. **If you see connection errors:**
   - Check if MongoDB is running
   - Verify your connection string
   - Check firewall settings
   - For Atlas: Verify IP whitelist and credentials

---

## Test Database Connection

You can test the connection by registering a user:

1. Start frontend: `cd frontend && npm run dev`
2. Go to http://localhost:3000
3. Click "Register"
4. Create a test account
5. If successful, MongoDB is connected! ✅

---

## Troubleshooting

### Error: "connect ECONNREFUSED 127.0.0.1:27017"

- MongoDB is not running locally
- Start MongoDB: `brew services start mongodb-community@7.0`

### Error: "Authentication failed"

- Wrong username/password in connection string
- Check your Atlas credentials

### Error: "IP not whitelisted"

- Add your IP in Atlas Network Access
- Or allow access from anywhere (0.0.0.0/0)

### Error: "Cannot find module 'mongoose'"

- Run: `cd backend && npm install`

---

## Current Configuration

Your app is configured to use:

- **Database Name:** healthcare-portal
- **Port:** 5000
- **Collections:** users, healthinfos, appointments, medicalrecords

---

## MongoDB Compass (GUI Tool)

Download MongoDB Compass for a visual interface:

- https://www.mongodb.com/try/download/compass
- Connect using your connection string
- View and manage your data visually

---

## Quick Start (Recommended)

**For macOS users:**

```bash
# Install MongoDB
brew tap mongodb/brew
brew install mongodb-community@7.0

# Start MongoDB
brew services start mongodb-community@7.0

# Start backend
cd backend
npm run dev

# Start frontend (in new terminal)
cd frontend
npm run dev
```

Done! Your app should now be connected to MongoDB! 🎉
