import { useEffect, useState } from "react";
import { healthAPI } from "../services/api";

function HealthInfo() {
  const [formData, setFormData] = useState({
    bloodPressure: "",
    heartRate: "",
    weight: "",
    height: "",
    allergies: "",
    medications: "",
    medicalHistory: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    healthAPI
      .getHealthInfo()
      .then((res) => {
        if (res.data) {
          setFormData({
            bloodPressure: res.data.bloodPressure || "",
            heartRate: res.data.heartRate || "",
            weight: res.data.weight || "",
            height: res.data.height || "",
            allergies: res.data.allergies?.join(", ") || "",
            medications: res.data.medications?.join(", ") || "",
            medicalHistory: res.data.medicalHistory || "",
          });
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const data = {
        ...formData,
        allergies: formData.allergies
          .split(",")
          .map((a) => a.trim())
          .filter(Boolean),
        medications: formData.medications
          .split(",")
          .map((m) => m.trim())
          .filter(Boolean),
      };

      await healthAPI.updateHealthInfo(data);
      setMessage("Health information updated successfully!");
    } catch (err) {
      setMessage("Failed to update health information");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Health Information
          </h1>

          {message && (
            <div
              className={`px-4 py-3 rounded mb-4 ${
                message.includes("success")
                  ? "bg-green-100 border border-green-400 text-green-700"
                  : "bg-red-100 border border-red-400 text-red-700"
              }`}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Blood Pressure
                </label>
                <input
                  type="text"
                  placeholder="120/80"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.bloodPressure}
                  onChange={(e) =>
                    setFormData({ ...formData, bloodPressure: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Heart Rate (bpm)
                </label>
                <input
                  type="text"
                  placeholder="72"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.heartRate}
                  onChange={(e) =>
                    setFormData({ ...formData, heartRate: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Weight (kg)
                </label>
                <input
                  type="text"
                  placeholder="70"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Height (cm)
                </label>
                <input
                  type="text"
                  placeholder="175"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.height}
                  onChange={(e) =>
                    setFormData({ ...formData, height: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Allergies (comma separated)
              </label>
              <input
                type="text"
                placeholder="Peanuts, Penicillin"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.allergies}
                onChange={(e) =>
                  setFormData({ ...formData, allergies: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Medications (comma separated)
              </label>
              <input
                type="text"
                placeholder="Aspirin, Vitamin D"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.medications}
                onChange={(e) =>
                  setFormData({ ...formData, medications: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Medical History
              </label>
              <textarea
                rows="4"
                placeholder="Enter your medical history..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.medicalHistory}
                onChange={(e) =>
                  setFormData({ ...formData, medicalHistory: e.target.value })
                }
              />
            </div>

            <button
              type="submit"
              disabled={saving}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition disabled:opacity-50"
            >
              {saving ? "Saving..." : "Save Health Information"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default HealthInfo;
