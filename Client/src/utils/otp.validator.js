// Validate 6-digit OTP input
export const validateOtp = (otpArray) => {
  const code = otpArray.join("");

  if (code.length !== 6)
    return { ok: false, message: "Please enter the complete 6-digit OTP" };

  if (!/^\d{6}$/.test(code))
    return { ok: false, message: "OTP must contain digits only" };

  return { ok: true, otp: code };
};
