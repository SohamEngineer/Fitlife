import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const activatePremium = async () => {
      try {
        const userId = localStorage.getItem("userId");

        const res = await fetch("/api/user/payment/activate", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        });

        const data = await res.json();

        if (res.ok) {
          localStorage.setItem("isPrime", "true");
        }

        navigate("/home");
      } catch (error) {
        console.error("Activation failed", error);
      }
    };

    activatePremium();
  }, [navigate]);

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h2>Payment Successful 🎉</h2>
      <p>Activating your premium membership...</p>
    </div>
  );
};

export default PaymentSuccess;