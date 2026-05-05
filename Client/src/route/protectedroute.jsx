import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth();
  const location = useLocation();
  const user = authUser || JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate to="/" replace />;

  const canSkipOnboarding = location.pathname === "/onboarding" || user.role === "admin";
  if (!canSkipOnboarding && !user.profileComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
