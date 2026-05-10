import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { generateAIPlanApi, getDeepProfileApi, updateDeepProfileApi } from "../../api/personalization.api";
import { useAuth } from "../../context/authcontext";
import "./onboarding.css";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const defaultForm = {
  age: "",
  gender: "",
  height: "",
  weight: "",
  bodyFat: "",
  activityLevel: "moderate",
  sleepHours: "",
  restingHeartRate: "",
  injuries: "",
  chronicConditions: "",
  medications: "",
  medicalNotes: "",
  yearsTraining: "",
  currentWorkoutType: "both",
  weeklyFrequency: "",
  recentTrainingNotes: "",
  primaryGoal: "",
  secondaryGoals: "",
  targetTimeline: "",
  motivation: "",
  location: "both",
  equipment: "bodyweight, dumbbells",
  duration: "45",
  intensity: "moderate",
  workoutDays: "Mon, Wed, Fri",
};

const choiceMaps = {
  gender: { male: "male", female: "female", other: "other" },
  location: { home: "home", gym: "gym", both: "both" },
  currentWorkoutType: { home: "home", gym: "gym", both: "both" },
  activityLevel: {
    sedentary: "sedentary",
    light: "light",
    moderate: "moderate",
    active: "active",
    very_active: "very_active",
    "very active": "very_active",
  },
  intensity: {
    gentle: "gentle",
    light: "gentle",
    beginner: "gentle",
    moderate: "moderate",
    intermediate: "moderate",
    hard: "hard",
    advanced: "hard",
  },
  primaryGoal: {
    weight_loss: "weight_loss",
    "weight loss": "weight_loss",
    muscle_gain: "muscle_gain",
    "muscle gain": "muscle_gain",
    maintain: "maintain",
    endurance: "endurance",
    strength: "strength",
    rehab: "rehab",
    mobility: "rehab",
  },
};

const optionGroups = {
  gender: [{ label: "Gender", options: [["male", "Male"], ["female", "Female"], ["other", "Other"]] }],
  activityLevel: [
    { label: "Lower movement", options: [["sedentary", "Sedentary"], ["light", "Light"]] },
    { label: "Higher movement", options: [["moderate", "Moderate"], ["active", "Active"], ["very_active", "Very active"]] },
  ],
  workoutType: [
    { label: "Training environment", options: [["home", "Home"], ["gym", "Gym"], ["both", "Both"]] },
  ],
  primaryGoal: [
    { label: "Body composition", options: [["weight_loss", "Weight loss"], ["muscle_gain", "Muscle gain"], ["maintain", "Maintain"]] },
    { label: "Performance and care", options: [["strength", "Strength"], ["endurance", "Endurance"], ["rehab", "Rehab and mobility"]] },
  ],
  location: [{ label: "Where you train", options: [["home", "Home"], ["gym", "Gym"], ["both", "Both"]] }],
  equipment: [
    { label: "Home setup", options: [["bodyweight", "Bodyweight only"], ["bodyweight, dumbbells", "Bodyweight + dumbbells"], ["resistance bands, yoga mat", "Bands + mat"]] },
    { label: "Gym setup", options: [["gym equipment", "General gym equipment"], ["barbell, dumbbells, machines", "Barbell + dumbbells + machines"], ["cables, machines, dumbbells", "Cables + machines + dumbbells"]] },
  ],
  duration: [
    { label: "Short", options: [["20", "20 minutes"], ["30", "30 minutes"], ["45", "45 minutes"]] },
    { label: "Long", options: [["60", "60 minutes"], ["90", "90 minutes"], ["120", "120 minutes"], ["150", "150 minutes"]] },
  ],
  intensity: [
    { label: "Effort", options: [["gentle", "Gentle"], ["moderate", "Moderate"], ["hard", "Hard"]] },
  ],
};

const toList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const normalizeChoice = (value, type, fallback = "") => {
  const key = String(value || "").trim().toLowerCase();
  return choiceMaps[type]?.[key] || fallback;
};

const flattenProfile = (profile) => ({
  age: profile?.physical?.age || "",
  gender: normalizeChoice(profile?.physical?.gender, "gender"),
  height: profile?.physical?.height || "",
  weight: profile?.physical?.weight || "",
  bodyFat: profile?.physical?.bodyFat || "",
  activityLevel: normalizeChoice(profile?.biological?.activityLevel, "activityLevel", "moderate"),
  sleepHours: profile?.biological?.sleepHours || "",
  restingHeartRate: profile?.biological?.restingHeartRate || "",
  injuries: profile?.medical?.injuries?.join(", ") || "",
  chronicConditions: profile?.medical?.chronicConditions?.join(", ") || "",
  medications: profile?.medical?.medications?.join(", ") || "",
  medicalNotes: profile?.medical?.notes || "",
  yearsTraining: profile?.trainingHistory?.yearsTraining || "",
  currentWorkoutType: normalizeChoice(profile?.trainingHistory?.currentWorkoutType, "currentWorkoutType", "both"),
  weeklyFrequency: profile?.trainingHistory?.weeklyFrequency || "",
  recentTrainingNotes: profile?.trainingHistory?.recentTrainingNotes || "",
  primaryGoal: normalizeChoice(profile?.goals?.primary, "primaryGoal", profile?.goals?.primary || ""),
  secondaryGoals: profile?.goals?.secondary?.join(", ") || "",
  targetTimeline: profile?.goals?.targetTimeline || "",
  motivation: profile?.goals?.motivation || "",
  location: normalizeChoice(profile?.preferences?.location, "location", "both"),
  equipment: profile?.preferences?.equipment?.join(", ") || "bodyweight, dumbbells",
  duration: profile?.preferences?.duration || "45",
  intensity: normalizeChoice(profile?.preferences?.intensity, "intensity", "moderate"),
  workoutDays: profile?.preferences?.workoutDays?.join(", ") || "Mon, Wed, Fri",
});

const buildPayload = (form) => ({
  physical: {
    age: Number(form.age),
    gender: form.gender,
    height: Number(form.height),
    weight: Number(form.weight),
    bodyFat: form.bodyFat ? Number(form.bodyFat) : null,
  },
  biological: {
    activityLevel: form.activityLevel,
    sleepHours: Number(form.sleepHours),
    restingHeartRate: form.restingHeartRate ? Number(form.restingHeartRate) : null,
  },
  medical: {
    injuries: toList(form.injuries),
    chronicConditions: toList(form.chronicConditions),
    medications: toList(form.medications),
    notes: form.medicalNotes,
  },
  trainingHistory: {
    yearsTraining: Number(form.yearsTraining),
    currentWorkoutType: form.currentWorkoutType,
    weeklyFrequency: Number(form.weeklyFrequency),
    recentTrainingNotes: form.recentTrainingNotes,
  },
  goals: {
    primary: form.primaryGoal,
    secondary: toList(form.secondaryGoals),
    targetTimeline: form.targetTimeline,
    motivation: form.motivation,
  },
  preferences: {
    location: form.location,
    equipment: toList(form.equipment),
    duration: Number(form.duration),
    intensity: form.intensity,
    workoutDays: toList(form.workoutDays),
  },
});

const numberInRange = (value, min, max) => {
  const number = Number(value);
  return Number.isFinite(number) && number >= min && number <= max;
};

const validateForm = (form) => {
  const checks = [
    [numberInRange(form.age, 13, 90), "Age must be between 13 and 90."],
    [Boolean(form.gender), "Select a gender."],
    [numberInRange(form.height, 120, 230), "Height must be between 120 and 230 cm."],
    [numberInRange(form.weight, 35, 220), "Weight must be between 35 and 220 kg."],
    [!form.bodyFat || numberInRange(form.bodyFat, 1, 70), "Body fat must be blank or between 1 and 70%."],
    [numberInRange(form.sleepHours, 1, 14), "Sleep hours must be between 1 and 14."],
    [!form.restingHeartRate || numberInRange(form.restingHeartRate, 35, 220), "Resting heart rate must be blank or between 35 and 220."],
    [numberInRange(form.yearsTraining, 0, 80), "Years training must be between 0 and 80."],
    [numberInRange(form.weeklyFrequency, 1, 7), "Weekly frequency must be between 1 and 7 days."],
    [Boolean(form.primaryGoal), "Choose a primary goal."],
    [toList(form.equipment).length > 0, "Choose or enter at least one equipment option."],
    [numberInRange(form.duration, 10, 180), "Duration must be between 10 and 180 minutes."],
    [toList(form.workoutDays).length > 0, "Choose at least one workout day."],
  ];

  return checks.find(([valid]) => !valid)?.[1] || "";
};

const renderOptionGroups = (groups) =>
  groups.map((group) => (
    <optgroup label={group.label} key={group.label}>
      {group.options.map(([value, label]) => (
        <option value={value} key={value}>{label}</option>
      ))}
    </optgroup>
  ));

const SelectField = ({ label, name, value, onChange, groups, required = false }) => (
  <label>
    <span>{label}</span>
    <select name={name} value={value} onChange={onChange} required={required}>
      {required && <option value="">Select</option>}
      {renderOptionGroups(groups)}
    </select>
  </label>
);

const InputField = ({ label, className = "", ...props }) => (
  <label className={className}>
    <span>{label}</span>
    <input {...props} />
  </label>
);

const ProfileSection = ({ title, summary, children, defaultOpen = false }) => (
  <details className="onboarding-panel" open={defaultOpen}>
    <summary>
      <span>{title}</span>
      <small>{summary}</small>
    </summary>
    <div className="onboarding-grid">{children}</div>
  </details>
);

const Onboarding = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const bmi = useMemo(() => {
    if (!form.height || !form.weight) return "--";
    const heightM = Number(form.height) / 100;
    if (!heightM) return "--";
    return (Number(form.weight) / (heightM * heightM)).toFixed(1);
  }, [form.height, form.weight]);

  const selectedDays = useMemo(() => toList(form.workoutDays), [form.workoutDays]);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getDeepProfileApi();
        setForm({ ...defaultForm, ...flattenProfile(data.profile) });
      } catch (error) {
        Swal.fire("Error", "Unable to load onboarding profile.", "error");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleDayToggle = (day) => {
    const selected = new Set(selectedDays);
    if (selected.has(day)) selected.delete(day);
    else selected.add(day);
    setForm((current) => ({ ...current, workoutDays: Array.from(selected).join(", ") }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationMessage = validateForm(form);

    if (validationMessage) {
      Swal.fire("Check your profile", validationMessage, "warning");
      return;
    }

    setSaving(true);

    try {
      await updateDeepProfileApi(buildPayload(form));
      updateUser({ profileComplete: true });

      try {
        await generateAIPlanApi();
      } catch (error) {
        Swal.fire("Profile saved", error.response?.data?.message || "AI plan can be generated from the dashboard when Claude is configured.", "info");
      }

      navigate("/dashboard");
    } catch (error) {
      Swal.fire("Check your profile", error.response?.data?.message || "Unable to save personalization profile.", "error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="onboarding-loading">Loading personalization...</div>;

  return (
    <main className="onboarding-page">
      <section className="onboarding-hero">
        <div>
          <h1>Fitlife AI profile</h1>
          <p>Keep this compact and accurate. These details drive safety guardrails, workout matching, and plan generation.</p>
        </div>
        <aside className="profile-signal">
          <span>BMI</span>
          <strong>{bmi}</strong>
          <small>{form.duration || "--"} min sessions · {selectedDays.length} days/week</small>
        </aside>
      </section>

      <form className="onboarding-form" onSubmit={handleSubmit}>
        <ProfileSection title="Body and recovery" summary="Age, body metrics, sleep, and activity" defaultOpen>
          <InputField label="Age" name="age" type="number" min="13" max="90" value={form.age} onChange={handleChange} required />
          <SelectField label="Gender" name="gender" value={form.gender} onChange={handleChange} groups={optionGroups.gender} required />
          <InputField label="Height (cm)" name="height" type="number" min="120" max="230" value={form.height} onChange={handleChange} required />
          <InputField label="Weight (kg)" name="weight" type="number" min="35" max="220" value={form.weight} onChange={handleChange} required />
          <InputField label="Body fat %" name="bodyFat" type="number" min="1" max="70" value={form.bodyFat} onChange={handleChange} placeholder="Optional" />
          <InputField label="Sleep hours" name="sleepHours" type="number" min="1" max="14" value={form.sleepHours} onChange={handleChange} required />
          <SelectField label="Activity level" name="activityLevel" value={form.activityLevel} onChange={handleChange} groups={optionGroups.activityLevel} />
          <InputField label="Resting heart rate" name="restingHeartRate" type="number" min="35" max="220" value={form.restingHeartRate} onChange={handleChange} placeholder="Optional" />
        </ProfileSection>

        <ProfileSection title="Medical guardrails" summary="Used only for warnings and substitutions">
          <InputField label="Injuries" name="injuries" value={form.injuries} onChange={handleChange} placeholder="knee pain, lower back tightness" />
          <InputField label="Chronic conditions" name="chronicConditions" value={form.chronicConditions} onChange={handleChange} placeholder="asthma, diabetes, none" />
          <InputField label="Medications" name="medications" value={form.medications} onChange={handleChange} placeholder="optional" />
          <InputField label="Medical notes" name="medicalNotes" value={form.medicalNotes} onChange={handleChange} placeholder="anything Fitlife should be careful about" />
        </ProfileSection>

        <ProfileSection title="Training and goals" summary="Experience, frequency, goal, and motivation" defaultOpen>
          <InputField label="Years training" name="yearsTraining" type="number" min="0" max="80" value={form.yearsTraining} onChange={handleChange} required />
          <SelectField label="Current workout" name="currentWorkoutType" value={form.currentWorkoutType} onChange={handleChange} groups={optionGroups.workoutType} />
          <InputField label="Weekly frequency" name="weeklyFrequency" type="number" min="1" max="7" value={form.weeklyFrequency} onChange={handleChange} required />
          <SelectField label="Primary goal" name="primaryGoal" value={form.primaryGoal} onChange={handleChange} groups={optionGroups.primaryGoal} required />
          <InputField label="Secondary goals" name="secondaryGoals" value={form.secondaryGoals} onChange={handleChange} placeholder="mobility, core strength" />
          <InputField label="Timeline" name="targetTimeline" value={form.targetTimeline} onChange={handleChange} placeholder="12 weeks, 6 months" />
          <InputField label="Motivation" name="motivation" value={form.motivation} onChange={handleChange} placeholder="why this goal matters" className="wide" />
          <InputField label="Recent training notes" name="recentTrainingNotes" value={form.recentTrainingNotes} onChange={handleChange} placeholder="recent split, pain, skipped days" className="wide" />
        </ProfileSection>

        <ProfileSection title="Workout preferences" summary="Dropdown presets with editable days" defaultOpen>
          <SelectField label="Location" name="location" value={form.location} onChange={handleChange} groups={optionGroups.location} />
          <SelectField label="Equipment" name="equipment" value={form.equipment} onChange={handleChange} groups={optionGroups.equipment} />
          <SelectField label="Duration" name="duration" value={String(form.duration)} onChange={handleChange} groups={optionGroups.duration} />
          <SelectField label="Intensity" name="intensity" value={form.intensity} onChange={handleChange} groups={optionGroups.intensity} />
          <div className="day-picker wide">
            {days.map((day) => (
              <button key={day} type="button" className={selectedDays.includes(day) ? "active" : ""} onClick={() => handleDayToggle(day)}>
                {day}
              </button>
            ))}
          </div>
        </ProfileSection>

        <button className="onboarding-submit" type="submit" disabled={saving}>
          {saving ? "Building your AI plan..." : "Save profile and generate AI plan"}
        </button>
      </form>
    </main>
  );
};

export default Onboarding;
