# Testing Health Information Feature

## Issue Fixed

The HealthInfo model was missing the `steps`, `activeTime`, and `sleep` fields that the frontend was trying to save.

## Changes Made

### 1. Updated HealthInfo Model (`backend/models/HealthInfo.js`)

Added missing fields:

- `steps` (Number) - Daily step count
- `activeTime` (Number) - Active minutes per day
- `sleep` (Number) - Sleep hours per night
- Changed `weight` and `height` to Number type for proper calculations

### 2. Enhanced Backend Route (`backend/routes/health.js`)

- Added explicit field mapping
- Added console logging for debugging
- Better error handling
- Added `runValidators: true` to ensure data validation

### 3. Improved Frontend (`frontend/src/pages/HealthInfo.jsx`)

- Convert string inputs to numbers before sending
- Better error handling with specific error messages
- Console logging for debugging
- Auto-clear success message after 3 seconds

## How to Test

### Step 1: Start Backend Server

```bash
cd backend
npm start
```

The server should start on port 5000 (or the port specified in .env)

### Step 2: Start Frontend

```bash
cd frontend
npm run dev
```

The frontend should start on port 5173

### Step 3: Test the Feature

1. **Login as a Patient**

   - Go to http://localhost:5173/login
   - Login with patient credentials

2. **Navigate to Health Info**

   - Click on "Health Info" in the navigation
   - Or go directly to http://localhost:5173/health-info

3. **Fill in the Form**

   - Enter steps (e.g., 10000)
   - Enter active time (e.g., 30)
   - Enter sleep hours (e.g., 8)
   - Enter weight (e.g., 70)
   - Enter height (e.g., 175)
   - Add allergies (e.g., "Peanuts, Penicillin")
   - Add medications (e.g., "Aspirin, Vitamin D")
   - Add medical history

4. **Save the Data**

   - Click "Save Health Information"
   - You should see a success message

5. **Verify the Data**
   - Go to Profile page (http://localhost:5173/profile)
   - You should see all your health information displayed
   - Go to Dashboard (http://localhost:5173/dashboard)
   - You should see health metrics in the cards

## Debugging

### Check Browser Console

Open browser DevTools (F12) and check the Console tab for:

- "Submitting health data:" - Shows what's being sent
- "Response:" - Shows what the server returned
- Any error messages

### Check Backend Console

Look at your terminal where the backend is running for:

- "Received health data:" - Shows what the server received
- "User ID:" - Confirms authentication
- "Health info saved:" - Shows what was saved to database
- Any error messages

### Common Issues

#### 1. "Failed to update health information"

- Check if backend server is running
- Check if MongoDB is connected
- Check browser console for specific error
- Check backend console for error details

#### 2. Data Not Showing in Profile

- Verify data was actually saved (check backend console)
- Refresh the page
- Check if you're logged in as the same user
- Check browser console for API errors

#### 3. "Server error"

- Check MongoDB connection
- Verify .env file has correct MONGODB_URI
- Check if HealthInfo model is properly loaded
- Restart backend server

## API Endpoints

### GET /api/health

Fetch user's health information

- Requires authentication
- Returns health info object or empty object

### POST /api/health

Create or update health information

- Requires authentication
- Body: JSON with health data fields
- Returns success message and saved health info

## Database Structure

The HealthInfo document in MongoDB:

```json
{
  "_id": "ObjectId",
  "userId": "ObjectId (ref to User)",
  "steps": 10000,
  "activeTime": 30,
  "sleep": 8,
  "weight": 70,
  "height": 175,
  "allergies": ["Peanuts", "Penicillin"],
  "medications": ["Aspirin", "Vitamin D"],
  "medicalHistory": "No major health issues",
  "lastUpdated": "2024-01-20T10:30:00.000Z"
}
```

## Success Indicators

✅ Success message appears after saving
✅ Data appears in Profile page
✅ Metrics show in Dashboard
✅ Form pre-fills with existing data on reload
✅ No errors in browser console
✅ No errors in backend console

## Next Steps

If everything works:

1. Remove console.log statements for production
2. Add data validation on frontend
3. Add loading states
4. Consider adding health data history/trends
