// Validate signup form inputs
export const validateSignup = (formData) => {
  if (!formData.name.trim()) 
    return { ok: false, message: "Please enter your name", field: "name" };

  if (!formData.email.trim()) 
    return { ok: false, message: "Please enter your email", field: "email" };

  if (!formData.password.trim()) 
    return { ok: false, message: "Please enter password", field: "password" };

  if (formData.password !== formData.confirmPassword)
    return { ok: false, message: "Passwords do not match", field: "confirmPassword" };

  return { ok: true };
};
