# Doctor Portal Features

## Overview

The Doctor Portal provides healthcare professionals with tools to manage their practice, patients, and appointments efficiently.

## Features

### 1. Doctor Dashboard

- **Statistics Overview**: View total patients, today's appointments, pending appointments, and completed consultations
- **Quick Actions**: Fast access to appointments, patients, and schedule management
- **Today's Schedule**: See upcoming appointments at a glance

### 2. Patient Management

- **Patient List**: View all registered patients
- **Search Functionality**: Quickly find patients by name
- **Patient Details**: Access patient information including email, phone, last visit, and status
- **Patient Status**: Track active and inactive patients

### 3. Appointment Management

- **View Appointments**: See all scheduled appointments
- **Filter Options**: Filter by status (All, Pending, Confirmed, Completed)
- **Appointment Actions**:
  - Confirm pending appointments
  - Cancel appointments
  - Mark appointments as completed
- **Appointment Details**: View patient name, appointment type, date, and time

### 4. Schedule Management

- **Weekly Schedule**: Set availability for each day of the week
- **Working Hours**: Define start and end times for each day
- **Appointment Settings**:
  - Set appointment duration (15, 30, 45, or 60 minutes)
  - Configure buffer time between appointments
  - Set maximum appointments per day

## User Roles

### Doctor Role

When registering or logging in as a doctor, users get access to:

- Doctor-specific dashboard
- Patient management interface
- Appointment management system
- Schedule configuration

### Patient Role

Regular patients continue to use the standard patient portal with:

- Personal dashboard
- Appointment booking
- Medical records
- Health information tracking
- Goals management

## Navigation

### Doctor Navbar

The doctor navbar provides quick access to:

- Dashboard
- Appointments
- Patients
- Schedule
- Profile
- Logout

## Getting Started

### Register as a Doctor

1. Go to the registration page
2. Fill in your details (name, email, password)
3. Select "Doctor" from the role dropdown
4. Click Register

### Login as a Doctor

1. Go to the login page
2. Enter your credentials
3. You'll be automatically redirected to the Doctor Dashboard

## Technical Implementation

### Frontend Structure

```
frontend/src/
├── pages/
│   └── doctor/
│       ├── DoctorDashboard.jsx
│       ├── DoctorAppointments.jsx
│       ├── DoctorPatients.jsx
│       └── DoctorSchedule.jsx
└── components/
    └── DoctorNavbar.jsx
```

### Routes

- `/doctor/dashboard` - Doctor Dashboard
- `/doctor/appointments` - Appointment Management
- `/doctor/patients` - Patient List
- `/doctor/schedule` - Schedule Configuration

### Role-Based Access

The application uses role-based routing to ensure:

- Doctors can only access doctor routes
- Patients can only access patient routes
- Appropriate navbar is displayed based on user role

## Future Enhancements

- Real-time appointment notifications
- Patient medical history integration
- Prescription management
- Video consultation integration
- Analytics and reporting
- Multi-doctor practice management
