import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");
  let user = authUser;

  if (!user && storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (_error) {
      user = null;
    }
  }

  if (!user || !token) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return <Navigate to="/" replace />;
  }

  const canSkipOnboarding = location.pathname === "/onboarding" || user.role === "admin";
  if (!canSkipOnboarding && !user.profileComplete) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
};

export default ProtectedRoute;
