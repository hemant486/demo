# Health Information Feature

## Overview

The Health Information feature allows patients to track and manage their health data, which is then displayed across multiple pages in the application.

## Features Implemented

### 1. Health Info Page (`/health-info`)

Patients can enter and update:

- **Daily Activity**
  - Steps (daily step count)
  - Active Time (minutes of activity per day)
  - Sleep (hours per night)
- **Body Metrics**
  - Weight (kg)
  - Height (cm)
- **Medical Information**
  - Allergies (comma-separated list)
  - Current Medications (comma-separated list)
  - Medical History (text description)

### 2. Profile Page (`/profile`)

Now displays a comprehensive Health Information section showing:

- **Body Metrics Cards**
  - Weight
  - Height
  - BMI (automatically calculated)
- **Activity Metrics Cards**
  - Daily Steps
  - Active Time
  - Sleep Hours
- **Medical Information**
  - Allergies (displayed as tags)
  - Current Medications (displayed as tags)
  - Medical History (full text)
- **Last Updated Timestamp**
- **Quick Link** to update health information

### 3. Dashboard (`/dashboard`)

Shows quick health metrics at a glance:

- Steps counter
- Active time
- Sleep hours
- Quick action button to update health info

## Data Flow

### Saving Health Information

1. User fills out the form on `/health-info` page
2. Data is validated on the frontend
3. Arrays are created from comma-separated strings (allergies, medications)
4. Data is sent to backend via `POST /api/health`
5. Backend uses `findOneAndUpdate` with `upsert: true` to create or update
6. Success message is displayed to the user

### Displaying Health Information

1. Component mounts and calls `healthAPI.getHealthInfo()`
2. Backend retrieves health info for the authenticated user
3. Data is displayed in appropriate format:
   - Numbers for metrics
   - Tags for allergies/medications
   - Text for medical history
4. If no data exists, a helpful message with link to add data is shown

## Backend Implementation

### Model: `HealthInfo`

Located at: `backend/models/HealthInfo.js`

Fields:

- `userId` - Reference to User
- `steps` - Number
- `activeTime` - Number
- `sleep` - Number
- `weight` - Number
- `height` - Number
- `allergies` - Array of Strings
- `medications` - Array of Strings
- `medicalHistory` - String
- `lastUpdated` - Date

### Routes: `backend/routes/health.js`

- `GET /api/health` - Fetch user's health information
- `POST /api/health` - Create or update health information

### Authentication

All health routes are protected by the `auth` middleware, ensuring users can only access their own health data.

## Frontend Implementation

### API Service

Located at: `frontend/src/services/api.js`

```javascript
export const healthAPI = {
  getHealthInfo: () => api.get("/health"),
  updateHealthInfo: (data) => api.post("/health", data),
};
```

### Components Using Health Data

1. **HealthInfo.jsx** - Form to enter/update health data
2. **Profile.jsx** - Displays comprehensive health information
3. **Dashboard.jsx** - Shows quick health metrics

## User Experience

### First Time Users

- Profile page shows "No health information added yet"
- Prominent button to add health information
- Dashboard shows "0" for all metrics

### After Adding Health Info

- Profile page displays all entered health data in organized cards
- Dashboard shows real metrics
- Health Info page pre-fills with existing data for easy updates
- Last updated timestamp helps track data freshness

## Data Validation

### Frontend

- Number inputs for numeric fields
- Step values for decimal numbers (weight, sleep)
- Placeholder text to guide users
- Real-time form validation

### Backend

- User authentication required
- Data sanitization
- Automatic timestamp on updates
- Upsert operation prevents duplicates

## Privacy & Security

- Health data is user-specific (filtered by `userId`)
- Authentication required for all operations
- Data encrypted in transit (HTTPS)
- No sharing of health data between users

## Future Enhancements

- Health data history/trends
- Charts and graphs for metrics over time
- Health goals and recommendations
- Integration with wearable devices
- Doctor access to patient health data
- Export health data as PDF
- Health reminders and notifications

## Testing

### Manual Testing Steps

1. **Add Health Information**

   - Go to `/health-info`
   - Fill in all fields
   - Click "Save Health Information"
   - Verify success message appears

2. **View in Profile**

   - Go to `/profile`
   - Verify health information section appears
   - Check all metrics are displayed correctly
   - Verify BMI calculation is accurate

3. **View in Dashboard**

   - Go to `/dashboard`
   - Verify health metrics cards show correct data
   - Check that values match what was entered

4. **Update Health Information**
   - Go to `/health-info`
   - Verify form is pre-filled with existing data
   - Change some values
   - Save and verify updates appear everywhere

## Troubleshooting

### Health Info Not Saving

- Check browser console for errors
- Verify backend server is running
- Check authentication token is valid
- Verify MongoDB connection

### Health Info Not Displaying

- Check if data was actually saved (check MongoDB)
- Verify API calls are successful (Network tab)
- Check for JavaScript errors in console
- Ensure user is authenticated

### BMI Not Calculating

- Verify both weight and height are entered
- Check that values are numbers, not strings
- Ensure height is in cm and weight in kg
