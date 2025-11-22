import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { healthAPI } from "../services/api";
import axios from "../services/api";

function Dashboard({ user }) {
  const [healthInfo, setHealthInfo] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([healthAPI.getHealthInfo(), axios.get("/appointments")])
      .then(([healthRes, apptRes]) => {
        setHealthInfo(healthRes.data);
        setAppointments(apptRes.data.slice(0, 3));
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const upcomingAppointments = appointments.filter(
    (apt) => apt.status !== "cancelled" && new Date(apt.date) >= new Date()
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-xl shadow-2xl p-8 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">
                Welcome back, {user.name}!
              </h1>
              <p className="text-gray-600 text-lg">
                <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-500 text-sm">Today</p>
              <p className="text-2xl font-bold text-gray-800">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Blood Pressure</h3>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6z" />
              </svg>
            </div>
            <p className="text-3xl font-bold">
              {loading ? "..." : healthInfo?.bloodPressure || "N/A"}
            </p>
            <p className="text-blue-100 text-sm mt-1">mmHg</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Heart Rate</h3>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold">
              {loading ? "..." : healthInfo?.heartRate || "N/A"}
            </p>
            <p className="text-green-100 text-sm mt-1">bpm</p>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Weight</h3>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path
                  fillRule="evenodd"
                  d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold">
              {loading ? "..." : healthInfo?.weight || "N/A"}
            </p>
            <p className="text-purple-100 text-sm mt-1">kg</p>
          </div>

          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl shadow-lg p-6 transform hover:scale-105 transition">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-semibold">Appointments</h3>
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-3xl font-bold">{upcomingAppointments.length}</p>
            <p className="text-orange-100 text-sm mt-1">Upcoming</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Upcoming Appointments
            </h2>
            {upcomingAppointments.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No upcoming appointments
              </p>
            ) : (
              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt._id}
                    className="border-l-4 border-blue-500 bg-blue-50 p-4 rounded"
                  >
                    <p className="font-semibold text-gray-800">
                      {new Date(apt.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {apt.time} - {apt.reason}
                    </p>
                  </div>
                ))}
              </div>
            )}
            <Link to="/appointments">
              <button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
                View All Appointments
              </button>
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link to="/appointments">
                <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Schedule Appointment
                </button>
              </Link>
              <Link to="/records">
                <button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9 2a2 2 0 00-2 2v8a2 2 0 002 2h6a2 2 0 002-2V6.414A2 2 0 0016.414 5L14 2.586A2 2 0 0012.586 2H9z" />
                  </svg>
                  View Medical Records
                </button>
              </Link>
              <Link to="/health-info">
                <button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Update Health Info
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
