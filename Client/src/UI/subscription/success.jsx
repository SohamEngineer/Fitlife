import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosInstance";
import { useAuth } from "../../context/authcontext";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  useEffect(() => {
    const activatePremium = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") || "null");
        const res = await axios.post("/users/activate", { userId: user?.id });
        updateUser({ ...res.data.user, isPremium: true });

        navigate("/dashboard");
      } catch (error) {
        console.error("Activation failed", error);
      }
    };

    activatePremium();
  }, [navigate, updateUser]);

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h2>Payment Successful 🎉</h2>
      <p>Activating your premium membership...</p>
    </div>
  );
};

export default PaymentSuccess;
