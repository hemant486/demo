# Starting the Application

## Quick Start

### Terminal 1 - Backend Server

```bash
cd backend
npm run dev
```

Expected output:

```
🚀 Server running on port 5000
📍 API available at http://localhost:5000
MongoDB Connected: ...
```

### Terminal 2 - Frontend Server

```bash
cd frontend
npm run dev
```

Expected output:

```
VITE v... ready in ... ms

➜  Local:   http://localhost:5173/
➜  Network: use --host to expose
```

## Troubleshooting

### Backend Won't Start

**Error: "Cannot find module"**

```bash
cd backend
npm install
npm run dev
```

**Error: "MongoDB connection failed"**

- Check if MongoDB is running
- Verify MONGODB_URI in backend/.env
- See MONGODB_SETUP.md for setup instructions

**Error: "Port 5000 already in use"**

```bash
# Find and kill the process using port 5000
# On Mac/Linux:
lsof -ti:5000 | xargs kill -9

# On Windows:
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Frontend Won't Start

**Error: "Cannot find module"**

```bash
cd frontend
npm install
npm run dev
```

**Error: "Port 5173 already in use"**
The frontend will automatically try the next available port (5174, 5175, etc.)

### Health Info Not Saving

1. **Check Backend is Running**

   - Open http://localhost:5000 in browser
   - Should see: `{"message":"Healthcare Portal API"}`

2. **Check MongoDB Connection**

   - Look at backend terminal
   - Should see "MongoDB Connected"

3. **Check Browser Console**

   - Press F12 to open DevTools
   - Go to Console tab
   - Look for errors when clicking "Save"

4. **Check Network Tab**
   - Press F12 to open DevTools
   - Go to Network tab
   - Click "Save Health Information"
   - Look for POST request to /api/health
   - Check if it returns 200 OK or an error

## Testing the Fix

1. Start both servers (backend and frontend)
2. Login as a patient
3. Go to Health Info page
4. Fill in some data
5. Click "Save Health Information"
6. Check for success message
7. Go to Profile page
8. Verify health info is displayed
9. Go to Dashboard
10. Verify metrics are shown

## Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

## Common Commands

### Install Dependencies

```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

### Run Tests

```bash
# Backend
cd backend && npm test

# Frontend
cd frontend && npm test
```

### Build for Production

```bash
# Frontend
cd frontend && npm run build
```
