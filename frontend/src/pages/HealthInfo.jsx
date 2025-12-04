import { useEffect, useState } from "react";
import axios from "../services/api";

function HealthInfo() {
  const [healthInfo, setHealthInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHealthInfo();
  }, []);

  const fetchHealthInfo = async () => {
    try {
      const res = await axios.get("/health");
      setHealthInfo(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Health Information
          </h1>
          <div className="mt-4 bg-blue-50 border-l-4 border-blue-500 p-4 rounded">
            <p className="text-blue-700">
              <strong>📋 Note:</strong> Your health information is managed by
              your doctor. If you need any updates, please consult with your
              healthcare provider during your appointment.
            </p>
          </div>
        </div>

        {!healthInfo || !healthInfo._id ? (
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
              <path
                fillRule="evenodd"
                d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                clipRule="evenodd"
              />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No Health Information Yet
            </h3>
            <p className="text-gray-500">
              Your doctor will add your health information during your
              appointments.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Daily Activity */}
            <div className="bg-gradient-to-r from-violet-50 to-purple-50 rounded-lg shadow-lg p-6 border border-violet-200">
              <h2 className="text-xl font-bold text-violet-900 mb-4">
                📊 Daily Activity
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Steps</p>
                  <p className="text-2xl font-bold text-violet-600">
                    {healthInfo.steps || 0}
                  </p>
                  <p className="text-xs text-gray-500">steps/day</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Active Time</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {healthInfo.activeTime || 0}
                  </p>
                  <p className="text-xs text-gray-500">minutes/day</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Sleep</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {healthInfo.sleep || 0}
                  </p>
                  <p className="text-xs text-gray-500">hours/night</p>
                </div>
              </div>
            </div>

            {/* Body Metrics */}
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg shadow-lg p-6 border border-emerald-200">
              <h2 className="text-xl font-bold text-emerald-900 mb-4">
                📏 Body Metrics
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Weight</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {healthInfo.weight || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">kg</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Height</p>
                  <p className="text-2xl font-bold text-emerald-600">
                    {healthInfo.height || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">cm</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Blood Pressure</p>
                  <p className="text-2xl font-bold text-red-600">
                    {healthInfo.bloodPressure || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">mmHg</p>
                </div>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Heart Rate</p>
                  <p className="text-2xl font-bold text-red-600">
                    {healthInfo.heartRate || "N/A"}
                  </p>
                  <p className="text-xs text-gray-500">bpm</p>
                </div>
              </div>
            </div>

            {/* Medical Information */}
            <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg shadow-lg p-6 border border-rose-200">
              <h2 className="text-xl font-bold text-rose-900 mb-4">
                💊 Medical Information
              </h2>
              <div className="space-y-4">
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </p>
                  {healthInfo.allergies && healthInfo.allergies.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {healthInfo.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No allergies recorded
                    </p>
                  )}
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Current Medications
                  </p>
                  {healthInfo.medications &&
                  healthInfo.medications.length > 0 ? (
                    <div className="flex flex-wrap gap-2">
                      {healthInfo.medications.map((medication, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                          {medication}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 text-sm">
                      No medications recorded
                    </p>
                  )}
                </div>

                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    Medical History
                  </p>
                  <p className="text-gray-700">
                    {healthInfo.medicalHistory || "No medical history recorded"}
                  </p>
                </div>
              </div>
            </div>

            {healthInfo.lastUpdated && (
              <div className="text-center text-sm text-gray-500">
                Last updated by your doctor:{" "}
                {new Date(healthInfo.lastUpdated).toLocaleDateString()}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default HealthInfo;
