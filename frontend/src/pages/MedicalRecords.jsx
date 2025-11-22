import { useEffect, useState } from "react";
import axios from "../services/api";

function MedicalRecords() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const res = await axios.get("/records");
      setRecords(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
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
      <div className="container mx-auto px-4 max-w-6xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Medical Records
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {records.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-8 text-center text-gray-500">
                No medical records found.
              </div>
            ) : (
              records.map((record) => (
                <div
                  key={record._id}
                  onClick={() => setSelectedRecord(record)}
                  className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition hover:shadow-xl ${
                    selectedRecord?._id === record._id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {record.diagnosis}
                    </h3>
                    <span className="text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </span>
                  </div>
                  {record.doctorId && (
                    <p className="text-gray-600 text-sm">
                      Dr. {record.doctorId.name}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>

          <div className="sticky top-8">
            {selectedRecord ? (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Record Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Date
                    </label>
                    <p className="text-gray-600">
                      {new Date(selectedRecord.date).toLocaleDateString()}
                    </p>
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-1">
                      Diagnosis
                    </label>
                    <p className="text-gray-600">{selectedRecord.diagnosis}</p>
                  </div>

                  {selectedRecord.treatment && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Treatment
                      </label>
                      <p className="text-gray-600">
                        {selectedRecord.treatment}
                      </p>
                    </div>
                  )}

                  {selectedRecord.prescription &&
                    selectedRecord.prescription.length > 0 && (
                      <div>
                        <label className="block text-gray-700 font-medium mb-1">
                          Prescription
                        </label>
                        <ul className="list-disc list-inside text-gray-600">
                          {selectedRecord.prescription.map((med, idx) => (
                            <li key={idx}>{med}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {selectedRecord.notes && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Notes
                      </label>
                      <p className="text-gray-600">{selectedRecord.notes}</p>
                    </div>
                  )}

                  {selectedRecord.doctorId && (
                    <div>
                      <label className="block text-gray-700 font-medium mb-1">
                        Doctor
                      </label>
                      <p className="text-gray-600">
                        Dr. {selectedRecord.doctorId.name}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-lg shadow-lg p-8 text-center text-gray-500">
                Select a record to view details
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalRecords;
