import { useEffect, useState } from "react";
import { profileApi } from "../../../api/profile.api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authcontext";

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const {logout}=useAuth();
  const handlelogout=()=>{
    logout();
    navigate("/")
  }
  const navigate = useNavigate();
  const handleNavigate=()=>{
    navigate("/home")
  }
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await profileApi();
        setUser(data.user);
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return { user, loading, error,handleNavigate ,handlelogout};
};
