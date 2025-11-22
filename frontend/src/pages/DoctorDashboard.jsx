import { useEffect, useState } from "react";
import axios from "../services/api";

function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([axios.get("/appointments"), axios.get("/auth/patients")])
      .then(([apptRes, patientsRes]) => {
        setAppointments(apptRes.data);
        setPatients(patientsRes.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleUpdateStatus = async (id, status) => {
    try {
      await axios.patch(`/appointments/${id}`, { status });
      setAppointments(
        appointments.map((apt) => (apt._id === id ? { ...apt, status } : apt))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const todayAppointments = appointments.filter((apt) => {
    const today = new Date().toDateString();
    return new Date(apt.date).toDateString() === today;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Doctor Dashboard
        </h1>

        <div className="grid md:grid-cols-3 gap-6 mb-6">
          <div className="bg-blue-500 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Today's Appointments</h3>
            <p className="text-4xl font-bold">{todayAppointments.length}</p>
          </div>
          <div className="bg-green-500 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Total Patients</h3>
            <p className="text-4xl font-bold">{patients.length}</p>
          </div>
          <div className="bg-purple-500 text-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Pending</h3>
            <p className="text-4xl font-bold">
              {appointments.filter((a) => a.status === "pending").length}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Today's Appointments
          </h2>
          {todayAppointments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No appointments for today
            </p>
          ) : (
            <div className="space-y-4">
              {todayAppointments.map((apt) => (
                <div
                  key={apt._id}
                  className="border rounded-lg p-4 hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg">
                        {apt.patientId?.name}
                      </h3>
                      <p className="text-gray-600">Time: {apt.time}</p>
                      <p className="text-gray-600">Reason: {apt.reason}</p>
                      <span
                        className={`inline-block mt-2 px-3 py-1 rounded-full text-sm ${
                          apt.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : apt.status === "confirmed"
                            ? "bg-blue-100 text-blue-800"
                            : apt.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {apt.status}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {apt.status === "pending" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(apt._id, "confirmed")
                          }
                          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
                        >
                          Confirm
                        </button>
                      )}
                      {apt.status === "confirmed" && (
                        <button
                          onClick={() =>
                            handleUpdateStatus(apt._id, "completed")
                          }
                          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition"
                        >
                          Complete
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
