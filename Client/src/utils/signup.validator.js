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
export const Step2Validation = (fitnessData) => {
  if (!fitnessData.gender)
    return { ok: false, message: "Select gender", field: "gender" };

  if (!fitnessData.dateOfBirth)
    return { ok: false, message: "Enter birth date", field: "dateOfBirth" };

  if (!fitnessData.height)
    return { ok: false, message: "Enter height", field: "height" };

  if (!fitnessData.weight)
    return { ok: false, message: "Enter weight", field: "weight" };

  if (!fitnessData.fitnessLevel)
    return { ok: false, message: "Select fitness level", field: "fitnessLevel" };

  if (!fitnessData.goal)
    return { ok: false, message: "Select goal", field: "goal" };

  if (!fitnessData.workoutPreference)
    return { ok: false, message: "Select workout preference", field: "workoutPreference" };

  // 🔥 THIS WAS MISSING → THE REAL BUG
  return { ok: true };
};

