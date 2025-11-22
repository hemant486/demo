import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import HealthInfo from "./pages/HealthInfo";
import Appointments from "./pages/Appointments";
import MedicalRecords from "./pages/MedicalRecords";
import Navbar from "./components/Navbar";
import PublicNavbar from "./components/PublicNavbar";
import { authAPI } from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      authAPI
        .getMe()
        .then((res) => setUser(res.data))
        .catch(() => localStorage.removeItem("token"))
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="mt-4 text-gray-600 font-medium">
            Loading Healthcare Portal...
          </p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      {user ? <Navbar user={user} onLogout={handleLogout} /> : <PublicNavbar />}
      <Routes>
        <Route
          path="/"
          element={!user ? <Home /> : <Navigate to="/dashboard" />}
        />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route
          path="/login"
          element={
            !user ? <Login setUser={setUser} /> : <Navigate to="/dashboard" />
          }
        />
        <Route
          path="/register"
          element={
            !user ? (
              <Register setUser={setUser} />
            ) : (
              <Navigate to="/dashboard" />
            )
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/" />}
        />
        <Route
          path="/appointments"
          element={user ? <Appointments /> : <Navigate to="/" />}
        />
        <Route
          path="/records"
          element={user ? <MedicalRecords /> : <Navigate to="/" />}
        />
        <Route
          path="/health-info"
          element={user ? <HealthInfo /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
}

export default App;
