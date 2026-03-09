const useHostedPayment = () => {
  const openPayment = (planKey) => {
      console.log("Received planKey:", planKey);

    const links = {
      regular: "https://rzp.io/rzp/u634VLl",
      standard: "https://rzp.io/rzp/efxp9VpM",
      gold: "https://rzp.io/rzp/gb0OK4AP", // ⚠ fix this if wrong
    };

    const url = links[planKey];

    if (!url) {
      console.error("Invalid plan selected");
      return;
    }

    window.location.href = url;
  };

  return { openPayment };
};

export default useHostedPayment;