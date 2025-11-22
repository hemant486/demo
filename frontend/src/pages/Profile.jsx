import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import axios, { healthAPI } from "../services/api";

export default function Profile() {
  const { user } = useAuth();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    dateOfBirth: "",
    gender: "",
  });
  const [healthInfo, setHealthInfo] = useState(null);
  const [loadingHealth, setLoadingHealth] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Fetch health information
    healthAPI
      .getHealthInfo()
      .then((res) => {
        if (res.data) {
          setHealthInfo(res.data);
        }
      })
      .catch((err) => console.error("Failed to fetch health info:", err))
      .finally(() => setLoadingHealth(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch("/auth/profile", formData);
      setMessage("Profile updated successfully!");
      setEditing(false);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-cyan-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="card">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-teal-900">My Profile</h1>
            <button
              onClick={() => setEditing(!editing)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg transition"
            >
              {editing ? "Cancel" : "Edit Profile"}
            </button>
          </div>

          {message && (
            <div
              className={`mb-4 p-3 rounded ${
                message.includes("success")
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <div className="flex items-center gap-4 mb-6 pb-6 border-b">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user?.name}</h2>
              <p className="text-gray-600 capitalize">{user?.role}</p>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>

          {editing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className="input"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="input"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="input"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="input"
                    value={formData.dateOfBirth}
                    onChange={(e) =>
                      setFormData({ ...formData, dateOfBirth: e.target.value })
                    }
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Gender
                </label>
                <select
                  className="input"
                  value={formData.gender}
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Address
                </label>
                <textarea
                  className="input"
                  rows="3"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Save Changes
              </button>
            </form>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Role
                </label>
                <p className="text-lg text-gray-900 capitalize">{user?.role}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Email
                </label>
                <p className="text-lg text-gray-900">{user?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-500">
                  Member Since
                </label>
                <p className="text-lg text-gray-900">
                  {new Date(user?.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          )}
        </div>

        {user?.role === "patient" && (
          <div className="card mt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-teal-900">
                Health Information
              </h2>
              <a
                href="/health-info"
                className="text-teal-600 hover:text-teal-700 text-sm font-medium"
              >
                Update →
              </a>
            </div>

            {loadingHealth ? (
              <div className="text-center py-4 text-gray-500">
                Loading health information...
              </div>
            ) : healthInfo && Object.keys(healthInfo).length > 1 ? (
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  {healthInfo.weight && (
                    <div className="p-3 bg-emerald-50 rounded-lg">
                      <p className="text-sm text-emerald-600 font-medium">
                        Weight
                      </p>
                      <p className="text-2xl font-bold text-emerald-900">
                        {healthInfo.weight} kg
                      </p>
                    </div>
                  )}
                  {healthInfo.height && (
                    <div className="p-3 bg-teal-50 rounded-lg">
                      <p className="text-sm text-teal-600 font-medium">
                        Height
                      </p>
                      <p className="text-2xl font-bold text-teal-900">
                        {healthInfo.height} cm
                      </p>
                    </div>
                  )}
                  {healthInfo.weight && healthInfo.height && (
                    <div className="p-3 bg-cyan-50 rounded-lg">
                      <p className="text-sm text-cyan-600 font-medium">BMI</p>
                      <p className="text-2xl font-bold text-cyan-900">
                        {(
                          healthInfo.weight /
                          Math.pow(healthInfo.height / 100, 2)
                        ).toFixed(1)}
                      </p>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  {healthInfo.steps && (
                    <div className="p-3 bg-violet-50 rounded-lg">
                      <p className="text-sm text-violet-600 font-medium">
                        Daily Steps
                      </p>
                      <p className="text-xl font-bold text-violet-900">
                        {healthInfo.steps}
                      </p>
                    </div>
                  )}
                  {healthInfo.activeTime && (
                    <div className="p-3 bg-orange-50 rounded-lg">
                      <p className="text-sm text-orange-600 font-medium">
                        Active Time
                      </p>
                      <p className="text-xl font-bold text-orange-900">
                        {healthInfo.activeTime} min
                      </p>
                    </div>
                  )}
                  {healthInfo.sleep && (
                    <div className="p-3 bg-indigo-50 rounded-lg">
                      <p className="text-sm text-indigo-600 font-medium">
                        Sleep
                      </p>
                      <p className="text-xl font-bold text-indigo-900">
                        {healthInfo.sleep} hrs
                      </p>
                    </div>
                  )}
                </div>

                {healthInfo.allergies && healthInfo.allergies.length > 0 && (
                  <div className="p-3 bg-rose-50 rounded-lg">
                    <p className="text-sm text-rose-600 font-medium mb-2">
                      Allergies
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {healthInfo.allergies.map((allergy, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-sm"
                        >
                          {allergy}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {healthInfo.medications &&
                  healthInfo.medications.length > 0 && (
                    <div className="p-3 bg-pink-50 rounded-lg">
                      <p className="text-sm text-pink-600 font-medium mb-2">
                        Current Medications
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {healthInfo.medications.map((medication, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-sm"
                          >
                            {medication}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                {healthInfo.medicalHistory && (
                  <div className="p-3 bg-amber-50 rounded-lg">
                    <p className="text-sm text-amber-600 font-medium mb-2">
                      Medical History
                    </p>
                    <p className="text-gray-700">{healthInfo.medicalHistory}</p>
                  </div>
                )}

                {healthInfo.lastUpdated && (
                  <p className="text-xs text-gray-500 text-right">
                    Last updated:{" "}
                    {new Date(healthInfo.lastUpdated).toLocaleDateString()}
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-8">
                <svg
                  className="w-16 h-16 text-gray-300 mx-auto mb-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1.323l3.954 1.582 1.599-.8a1 1 0 01.894 1.79l-1.233.616 1.738 5.42a1 1 0 01-.285 1.05A3.989 3.989 0 0115 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.715-5.349L11 6.477V16h2a1 1 0 110 2H7a1 1 0 110-2h2V6.477L6.237 7.582l1.715 5.349a1 1 0 01-.285 1.05A3.989 3.989 0 015 15a3.989 3.989 0 01-2.667-1.019 1 1 0 01-.285-1.05l1.738-5.42-1.233-.617a1 1 0 01.894-1.788l1.599.799L9 4.323V3a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="text-gray-500 mb-4">
                  No health information added yet
                </p>
                <a
                  href="/health-info"
                  className="inline-block bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg transition"
                >
                  Add Health Information
                </a>
              </div>
            )}
          </div>
        )}

        <div className="card mt-6">
          <h2 className="text-xl font-bold text-teal-900 mb-4">
            Account Security
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-gray-700">
                  Password Protected
                </span>
              </div>
              <button className="text-teal-600 hover:text-teal-700 text-sm font-medium">
                Change Password
              </button>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium text-gray-700">
                  Data Encrypted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
