export const validateResetPassword = (newPassword, confirmPassword) => {
  if (!newPassword.trim() || !confirmPassword.trim()) {
    return { ok: false, message: "Both fields are required" };
  }

  if (newPassword.length < 6) {
    return { ok: false, message: "Password must be at least 6 characters" };
  }

  if (newPassword !== confirmPassword) {
    return { ok: false, message: "Passwords do not match" };
  }

  return { ok: true };
};
