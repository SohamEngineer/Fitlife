import { useNavigate } from "react-router-dom";

const useHostedPayment = () => {
  const navigate = useNavigate();

  const openPayment = (planKey) => {
    console.log("Selected plan:", planKey);

    const links = {
      regular: "https://rzp.io/rzp/NeCFG03",
      standard: "https://rzp.io/rzp/NeCFG03",
      gold: "https://rzp.io/rzp/NeCFG03",
    };

    const url = links[planKey];

    if (!url) {
      console.error("Invalid plan selected");
      return;
    }

    // save plan for later activation
    localStorage.setItem("selectedPlan", planKey);

    // redirect to Razorpay
    window.location.href = url;
  };

  return { openPayment };
};

export default useHostedPayment;