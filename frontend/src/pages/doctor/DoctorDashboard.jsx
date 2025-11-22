import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function DoctorDashboard({ user }) {
  const [stats, setStats] = useState({
    totalPatients: 0,
    todayAppointments: 0,
    pendingAppointments: 0,
    completedToday: 0,
  });

  useEffect(() => {
    // TODO: Fetch doctor statistics from API
    // For now using mock data
    setStats({
      totalPatients: 45,
      todayAppointments: 8,
      pendingAppointments: 12,
      completedToday: 5,
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome, Dr. {user.name}
          </h1>
          <p className="text-gray-600 mt-2">
            Here's your practice overview for today
          </p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm">Total Patients</p>
                <p className="text-3xl font-bold mt-2">{stats.totalPatients}</p>
              </div>
              <svg
                className="w-12 h-12 text-blue-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
              </svg>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-green-500 to-green-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 text-sm">Today's Appointments</p>
                <p className="text-3xl font-bold mt-2">
                  {stats.todayAppointments}
                </p>
              </div>
              <svg
                className="w-12 h-12 text-green-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-yellow-500 to-yellow-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100 text-sm">Pending</p>
                <p className="text-3xl font-bold mt-2">
                  {stats.pendingAppointments}
                </p>
              </div>
              <svg
                className="w-12 h-12 text-yellow-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="card bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 text-sm">Completed Today</p>
                <p className="text-3xl font-bold mt-2">
                  {stats.completedToday}
                </p>
              </div>
              <svg
                className="w-12 h-12 text-purple-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/doctor/appointments"
                className="block p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Manage Appointments
                    </p>
                    <p className="text-sm text-gray-600">
                      View and update patient appointments
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                to="/doctor/patients"
                className="block p-4 bg-green-50 hover:bg-green-100 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">View Patients</p>
                    <p className="text-sm text-gray-600">
                      Access patient records and history
                    </p>
                  </div>
                </div>
              </Link>

              <Link
                to="/doctor/schedule"
                className="block p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition"
              >
                <div className="flex items-center gap-3">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <div>
                    <p className="font-semibold text-gray-900">
                      Manage Schedule
                    </p>
                    <p className="text-sm text-gray-600">
                      Set availability and working hours
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>

          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Today's Schedule
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">John Doe</p>
                    <p className="text-sm text-gray-600">Regular Checkup</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    9:00 AM
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">Jane Smith</p>
                    <p className="text-sm text-gray-600">Follow-up Visit</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    10:30 AM
                  </span>
                </div>
              </div>

              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">Mike Johnson</p>
                    <p className="text-sm text-gray-600">Consultation</p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    2:00 PM
                  </span>
                </div>
              </div>

              <Link
                to="/doctor/appointments"
                className="block text-center text-blue-600 hover:text-blue-700 font-medium mt-4"
              >
                View All Appointments →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
