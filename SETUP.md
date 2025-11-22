# Healthcare Portal - Setup Guide

## Quick Start

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare-portal
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

Start backend:

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### 3. MongoDB Setup

**Option A: Local MongoDB**

- Install MongoDB from https://www.mongodb.com/try/download/community
- Start MongoDB service

**Option B: MongoDB Atlas (Cloud)**

- Create free account at https://www.mongodb.com/cloud/atlas
- Create cluster and get connection string
- Update MONGODB_URI in .env

## Features Implemented

### Authentication & Security

- JWT token-based authentication
- Password hashing with bcrypt (10 rounds)
- Protected routes with middleware
- Role-based access control (Patient/Doctor/Admin)

### Patient Features

- Dashboard with health metrics overview
- Book and manage appointments
- View medical records
- Update health information (BP, heart rate, weight, allergies, medications)
- View upcoming appointments

### Doctor Features

- Doctor dashboard with patient overview
- View and manage patient appointments
- Confirm/complete appointments
- Access to patient list
- Create medical records

### UI/UX

- Modern gradient design with Tailwind CSS
- Responsive layout for all devices
- Interactive cards with hover effects
- Loading states and animations
- Icon-enhanced navigation
- Status badges for appointments

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `GET /api/auth/patients` - Get all patients (doctor only)

### Health Information

- `GET /api/health` - Get health info (protected)
- `POST /api/health` - Create/Update health info (protected)

### Appointments

- `GET /api/appointments` - Get all appointments (protected)
- `POST /api/appointments` - Create appointment (protected)
- `PATCH /api/appointments/:id` - Update appointment status (protected)
- `DELETE /api/appointments/:id` - Delete appointment (protected)

### Medical Records

- `GET /api/records` - Get medical records (protected)
- `POST /api/records` - Create medical record (doctor only)

## Tech Stack

**Frontend:**

- React 18 with Vite
- React Router DOM v6
- Axios for API calls
- Tailwind CSS for styling
- SVG icons

**Backend:**

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing
- CORS enabled

## Default Test Users

After starting the app, register users with these roles:

- Patient: Select "Patient" role during registration
- Doctor: Select "Doctor" role during registration

## Troubleshooting

### MongoDB Connection Error

- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, whitelist your IP address

### Port Already in Use

- Backend: Change PORT in .env
- Frontend: Change port in vite.config.js

### CORS Errors

- Ensure backend is running on port 5000
- Check API_URL in frontend/src/services/api.js

## Project Structure

```
healthcare-portal/
├── backend/
│   ├── config/db.js
│   ├── middleware/auth.js
│   ├── models/
│   │   ├── User.js
│   │   ├── HealthInfo.js
│   │   ├── Appointment.js
│   │   └── MedicalRecord.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── health.js
│   │   ├── appointments.js
│   │   └── records.js
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── StatCard.jsx
│   │   │   └── LoadingSpinner.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   ├── DoctorDashboard.jsx
│   │   │   ├── Appointments.jsx
│   │   │   ├── MedicalRecords.jsx
│   │   │   └── HealthInfo.jsx
│   │   ├── services/api.js
│   │   └── App.jsx
│   └── package.json
└── README.md
```

## Next Steps

1. Start both backend and frontend servers
2. Register a new account
3. Login and explore the dashboard
4. Add health information
5. Book appointments
6. View medical records

## Production Deployment

### Backend

- Set strong JWT_SECRET
- Use production MongoDB URI
- Enable HTTPS
- Set NODE_ENV=production
- Configure proper CORS origins

### Frontend

- Build: `npm run build`
- Update API_URL to production backend URL
- Deploy dist folder to hosting service

## Support

For issues or questions, check:

- MongoDB connection string format
- Node.js version (v16+)
- npm dependencies installed correctly
