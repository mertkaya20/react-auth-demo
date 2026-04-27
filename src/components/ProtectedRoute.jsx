import { Navigate } from "react-router-dom";

export function ProtectedRoute({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}
