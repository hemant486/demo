import { Link } from "react-router-dom";

export default function DoctorNavbar({ user, onLogout }) {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/doctor/dashboard" className="flex items-center gap-2">
            <svg
              className="w-8 h-8 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-xl font-bold text-gray-900">
              Doctor Portal
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/doctor/dashboard"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Dashboard
            </Link>
            <Link
              to="/doctor/appointments"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Appointments
            </Link>
            <Link
              to="/doctor/patients"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Patients
            </Link>
            <Link
              to="/doctor/schedule"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Schedule
            </Link>
            <Link
              to="/doctor/profile"
              className="text-gray-700 hover:text-blue-600 font-medium transition"
            >
              Profile Settings
            </Link>

            <div className="flex items-center gap-4 ml-4 pl-4 border-l">
              <Link
                to="/doctor/profile"
                className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition"
              >
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold text-sm">
                    {user.name.charAt(0)}
                  </span>
                </div>
                <span className="font-medium">Dr. {user.name}</span>
              </Link>
              <button
                onClick={onLogout}
                className="text-red-600 hover:text-red-700 font-medium transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
