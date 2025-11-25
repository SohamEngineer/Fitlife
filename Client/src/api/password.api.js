import axios from "./axiosInstance";

// Send OTP to email
export const sendOtpApi=async (email)=>{
      const res = await axios.post("/password/send-otp", { email });
  return res.data;

}
// Verify OTP
export const verifyOtpApi = async (email, otp) => {
  const res = await axios.post("/password/verify-otp", { email, otp });
  return res.data;
};

// Resend OTP
export const resendOtpApi = async (email) => {
  const res = await axios.post("/password/send-otp", { email });
  return res.data;
};
// Reset Password

export const resetPasswordApi = async (token, newPassword) => {
  const res = await axios.post("/password/reset-password", {
    token,
    newPassword,
  });
  return res.data;
};
