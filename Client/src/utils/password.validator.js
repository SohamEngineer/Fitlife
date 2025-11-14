export const validateForgotEmail = (email) => {
  if (!email.trim()) {
    return { ok: false, message: "Email field cannot be empty" };
  }

  // You can add regex here if needed
  return { ok: true };
};
