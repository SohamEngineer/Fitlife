import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authcontext";

const GuestRoute = ({ children }) => {
  const { authUser } = useAuth();
  const user = authUser || JSON.parse(localStorage.getItem("user"));

  return user ? <Navigate to="/home" replace /> : children;
};

export default GuestRoute;
