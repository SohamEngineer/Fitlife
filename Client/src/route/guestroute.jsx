import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const GuestRoute = ({ children }) => {
  const { authUser } = useAuth();
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

  if (!token && storedUser) {
    localStorage.removeItem("user");
  }

  return user && token ? <Navigate to={user.profileComplete ? "/dashboard" : "/onboarding"} replace /> : children;
};

export default GuestRoute;
