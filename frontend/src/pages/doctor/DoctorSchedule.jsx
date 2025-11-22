import { useState } from "react";

export default function DoctorSchedule() {
  const [schedule, setSchedule] = useState({
    monday: { enabled: true, start: "09:00", end: "17:00" },
    tuesday: { enabled: true, start: "09:00", end: "17:00" },
    wednesday: { enabled: true, start: "09:00", end: "17:00" },
    thursday: { enabled: true, start: "09:00", end: "17:00" },
    friday: { enabled: true, start: "09:00", end: "17:00" },
    saturday: { enabled: false, start: "09:00", end: "13:00" },
    sunday: { enabled: false, start: "09:00", end: "13:00" },
  });

  const handleToggleDay = (day) => {
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], enabled: !schedule[day].enabled },
    });
  };

  const handleTimeChange = (day, field, value) => {
    setSchedule({
      ...schedule,
      [day]: { ...schedule[day], [field]: value },
    });
  };

  const handleSave = () => {
    // TODO: Save schedule to API
    alert("Schedule saved successfully!");
  };

  const days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Schedule</h1>
          <p className="text-gray-600 mt-2">
            Set your availability and working hours
          </p>
        </div>

        <div className="card mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Weekly Schedule
          </h2>

          <div className="space-y-4">
            {days.map((day) => (
              <div
                key={day}
                className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center gap-3 w-40">
                  <input
                    type="checkbox"
                    checked={schedule[day].enabled}
                    onChange={() => handleToggleDay(day)}
                    className="w-5 h-5 text-blue-600 rounded"
                  />
                  <label className="font-medium text-gray-900 capitalize">
                    {day}
                  </label>
                </div>

                {schedule[day].enabled ? (
                  <div className="flex items-center gap-4 flex-1">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Start:</label>
                      <input
                        type="time"
                        value={schedule[day].start}
                        onChange={(e) =>
                          handleTimeChange(day, "start", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">End:</label>
                      <input
                        type="time"
                        value={schedule[day].end}
                        onChange={(e) =>
                          handleTimeChange(day, "end", e.target.value)
                        }
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                  </div>
                ) : (
                  <span className="text-gray-400 italic">Not available</span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={handleSave} className="btn-primary px-6 py-3">
              Save Schedule
            </button>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold text-gray-900 mb-4">
            Appointment Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Appointment Duration (minutes)
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="15">15 minutes</option>
                <option value="30" selected>
                  30 minutes
                </option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Buffer Time Between Appointments (minutes)
              </label>
              <select className="w-full px-4 py-2 border border-gray-300 rounded-lg">
                <option value="0">No buffer</option>
                <option value="5">5 minutes</option>
                <option value="10" selected>
                  10 minutes
                </option>
                <option value="15">15 minutes</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Appointments Per Day
              </label>
              <input
                type="number"
                defaultValue="12"
                min="1"
                max="50"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button onClick={handleSave} className="btn-primary px-6 py-3">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
