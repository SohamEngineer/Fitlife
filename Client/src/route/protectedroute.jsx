import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuth();
  const user = authUser || JSON.parse(localStorage.getItem("user"));

  return user ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
