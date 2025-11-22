import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, user, requiredRole }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

export default ProtectedRoute;
