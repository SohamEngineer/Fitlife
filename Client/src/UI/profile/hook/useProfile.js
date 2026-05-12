import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { profileApi } from "../../../api/profile.api";
import { getDeepProfileApi, updateDeepProfileApi } from "../../../api/personalization.api";
import { useAuth } from "../../../context/authcontext";
import { getUserAvatarSrc } from "../../../utils/userAvatar";

const titleCase = (value) =>
  String(value || "")
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

const cleanBodyFat = (value) => {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 && number <= 70 ? number : null;
};

const defaultProfile = (user = {}) => ({
  physical: {
    age: 21,
    gender: user.gender || "other",
    height: Number(user.height) || 170,
    weight: Number(user.weight) || 65,
    bodyFat: cleanBodyFat(user.bodyFat),
  },
  biological: {
    activityLevel: user.dailyActivityLevel || "moderate",
    sleepHours: 7,
    restingHeartRate: null,
  },
  medical: {
    injuries: [],
    chronicConditions: [],
    medications: [],
    notes: "",
  },
  trainingHistory: {
    yearsTraining: user.fitnessLevel === "advanced" ? 3 : user.fitnessLevel === "intermediate" ? 1 : 0,
    currentWorkoutType: user.workoutPreference || "both",
    weeklyFrequency: 3,
    recentTrainingNotes: "",
  },
  goals: {
    primary: user.goal || "maintain",
    secondary: [],
    targetTimeline: "",
    motivation: "",
  },
  preferences: {
    location: user.workoutPreference || "both",
    equipment: user.workoutPreference === "gym" ? ["gym equipment"] : ["bodyweight"],
    duration: 45,
    intensity: user.fitnessLevel === "advanced" ? "hard" : user.fitnessLevel === "beginner" ? "gentle" : "moderate",
    workoutDays: ["Mon", "Wed", "Fri"],
  },
});

const mergeProfile = (base, patch = {}) => ({
  physical: { ...base.physical, ...patch.physical },
  biological: { ...base.biological, ...patch.biological },
  medical: { ...base.medical, ...patch.medical },
  trainingHistory: { ...base.trainingHistory, ...patch.trainingHistory },
  goals: { ...base.goals, ...patch.goals },
  preferences: { ...base.preferences, ...patch.preferences },
});

const buildDisplayUser = (user, profile) => {
  const physical = profile?.physical || {};
  const goals = profile?.goals || {};
  const trainingHistory = profile?.trainingHistory || {};
  const preferences = profile?.preferences || {};
  const bodyFat = cleanBodyFat(physical.bodyFat ?? user?.bodyFat);

  return {
    ...user,
    avatarSrc: getUserAvatarSrc(user),
    weight: physical.weight || user?.weight || "--",
    height: physical.height || user?.height || "--",
    bodyFat,
    bodyFatLabel: bodyFat ? `${bodyFat}%` : "Not set",
    fitnessLevel: titleCase(preferences.intensity || user?.fitnessLevel || "Not set"),
    goal: titleCase(goals.primary || user?.goal || "Not set"),
    workoutType: titleCase(trainingHistory.currentWorkoutType || user?.workoutPreference || "both"),
  };
};

const buildEditForm = (displayUser, profile) => ({
  height: displayUser.height === "--" ? "" : displayUser.height,
  weight: displayUser.weight === "--" ? "" : displayUser.weight,
  bodyFat: displayUser.bodyFat || "",
  primaryGoal: profile?.goals?.primary || "maintain",
  intensity: profile?.preferences?.intensity || "moderate",
});

export const useProfile = () => {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [form, setForm] = useState(null);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [formError, setFormError] = useState("");
  const { logout, updateUser } = useAuth();
  const navigate = useNavigate();

  const handlelogout = () => {
    logout();
    navigate("/");
  };

  const handleNavigate = () => {
    navigate("/home");
  };

  const handleEdit = () => {
    setFormError("");
    setEditing(true);
  };

  const handleCancelEdit = () => {
    if (user) setForm(buildEditForm(user, profile));
    setFormError("");
    setEditing(false);
  };

  const handleEditChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    if (!profile || !form) return;

    const height = Number(form.height);
    const weight = Number(form.weight);
    const bodyFat = form.bodyFat === "" ? null : Number(form.bodyFat);

    if (!height || height < 120 || height > 230 || !weight || weight < 35 || weight > 220) {
      setFormError("Height must be 120-230 cm and weight must be 35-220 kg.");
      return;
    }

    if (bodyFat !== null && (bodyFat < 1 || bodyFat > 70)) {
      setFormError("Body fat must be blank or between 1 and 70%.");
      return;
    }

    setSaving(true);
    setFormError("");

    try {
      const payload = mergeProfile(profile, {
        physical: { height, weight, bodyFat },
        goals: { primary: form.primaryGoal },
        preferences: { intensity: form.intensity },
      });
      const data = await updateDeepProfileApi(payload);
      const stored = JSON.parse(localStorage.getItem("user") || "null") || {};
      const displayUser = buildDisplayUser(stored, data.profile);

      setProfile(data.profile);
      setUser(displayUser);
      setForm(buildEditForm(displayUser, data.profile));
      updateUser({
        profileComplete: true,
        height,
        weight,
        bodyFat,
        goal: form.primaryGoal,
        fitnessLevel: form.intensity === "hard" ? "advanced" : form.intensity === "gentle" ? "beginner" : "intermediate",
      });
      setEditing(false);
    } catch (err) {
      setFormError(err.response?.data?.message || "Unable to update profile right now.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const [userResult, profileResult] = await Promise.allSettled([
          profileApi(),
          getDeepProfileApi(),
        ]);

        if (userResult.status !== "fulfilled") throw userResult.reason;

        const baseUser = userResult.value.user;
        const deepProfile =
          profileResult.status === "fulfilled"
            ? mergeProfile(defaultProfile(baseUser), profileResult.value.profile)
            : defaultProfile(baseUser);
        const displayUser = buildDisplayUser(baseUser, deepProfile);

        setProfile(deepProfile);
        setUser(displayUser);
        setForm(buildEditForm(displayUser, deepProfile));
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return {
    user,
    form,
    formError,
    loading,
    error,
    editing,
    saving,
    handleNavigate,
    handlelogout,
    handleEdit,
    handleCancelEdit,
    handleEditChange,
    handleSaveProfile,
    navigate,
  };
};
