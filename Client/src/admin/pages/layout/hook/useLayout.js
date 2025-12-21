import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/authcontext";

function useLayout() {
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = authUser || storedUser;


  const handleLogout = () => {
    logout();          // clear auth state + storage
    // close dropdown
    navigate("/", { replace: true }); // redirect
  };

  return {
    user,
    handleLogout,
  };
}

export default useLayout;
