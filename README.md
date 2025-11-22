# Healthcare Portal 🏥

A comprehensive full-stack healthcare management application with modern UI, secure authentication, and role-based features for patients and doctors.

## ✨ Features

### 🔐 Authentication & Security

- JWT token-based authentication
- Password hashing with bcrypt (10 rounds)
- Protected routes with middleware
- Role-based access control (Patient/Doctor/Admin)
- Automatic token validation

### 👨‍⚕️ Patient Features

- **Interactive Dashboard** with health metrics overview
- **Appointment Management** - Book, view, and cancel appointments
- **Medical Records** - View diagnosis, treatments, and prescriptions
- **Health Information** - Track blood pressure, heart rate, weight, height
- **Medication Tracking** - Manage allergies and current medications
- **Medical History** - Maintain comprehensive health records

### 🩺 Doctor Features

- **Doctor Dashboard** with patient overview
- **Appointment Management** - View, confirm, and complete appointments
- **Patient List** - Access to all registered patients
- **Medical Records** - Create and manage patient records
- **Today's Schedule** - Quick view of daily appointments

### 🎨 Modern UI/UX

- Gradient designs with Tailwind CSS
- Fully responsive layout for all devices
- Interactive cards with hover effects
- Loading states and smooth animations
- Icon-enhanced navigation
- Status badges for appointments
- Real-time data updates

## Tech Stack

**Frontend:**

- React 18
- React Router DOM
- Axios
- Tailwind CSS
- Vite

**Backend:**

- Node.js
- Express
- MongoDB with Mongoose
- JWT for authentication
- bcryptjs for password hashing

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- MongoDB (local or Atlas)

### Backend Setup

1. Navigate to backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create `.env` file:

```bash
cp .env.example .env
```

4. Update `.env` with your MongoDB URI and JWT secret:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare-portal
JWT_SECRET=your_secure_jwt_secret_key
```

5. Start the backend server:

```bash
npm run dev
```

Backend will run on http://localhost:5000

### Frontend Setup

1. Navigate to frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Frontend will run on http://localhost:3000

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Health Information

- `GET /api/health` - Get health info (protected)
- `POST /api/health` - Create/Update health info (protected)

## Project Structure

```
healthcare-portal/
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── User.js
│   │   └── HealthInfo.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── health.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   └── Navbar.jsx
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── HealthInfo.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
└── README.md
```

## 🚀 Usage

### For Patients

1. Register with "Patient" role
2. Login to access your dashboard
3. View health metrics at a glance
4. Book appointments with doctors
5. Update health information
6. View medical records and prescriptions

### For Doctors

1. Register with "Doctor" role
2. Access doctor dashboard
3. View today's appointments
4. Confirm/complete patient appointments
5. Access patient list
6. Create medical records for patients

## 📸 Screenshots

The application includes:

- Modern login/register pages with gradient backgrounds
- Interactive dashboard with health metric cards
- Appointment booking and management interface
- Medical records viewer with detailed information
- Health information form with comprehensive fields
- Enhanced navigation with icons

## 🔒 Security Features

- **Password Security**: bcrypt hashing with 10 rounds
- **Token Authentication**: JWT with 7-day expiration
- **Protected Routes**: Middleware authentication on all sensitive endpoints
- **Role-Based Access**: Different permissions for patients and doctors
- **Secure Storage**: Tokens stored in localStorage with automatic validation
- **CORS Protection**: Configured for secure cross-origin requests

## 🛠️ Technologies Used

**Frontend:**

- React 18 with Hooks
- Vite (Fast build tool)
- React Router DOM v6
- Axios for HTTP requests
- Tailwind CSS for styling
- SVG icons for UI elements

**Backend:**

- Node.js with Express
- MongoDB with Mongoose ODM
- JWT for authentication
- bcryptjs for password hashing
- CORS middleware
- dotenv for environment variables

## 📝 Environment Variables

Create `.env` file in backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/healthcare-portal
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

MIT

## 👨‍💻 Author

Built with ❤️ for healthcare management

## 🙏 Acknowledgments

- Based on healthcare portal requirements
- Designed for ease of use and security
- Built with modern web technologies
