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
  duration: "40",
  intensity: "moderate",
  workoutDays: "Mon, Wed, Fri",
};

const toList = (value) =>
  String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);

const flattenProfile = (profile) => ({
  age: profile?.physical?.age || "",
  gender: profile?.physical?.gender || "",
  height: profile?.physical?.height || "",
  weight: profile?.physical?.weight || "",
  bodyFat: profile?.physical?.bodyFat || "",
  activityLevel: profile?.biological?.activityLevel || "moderate",
  sleepHours: profile?.biological?.sleepHours || "",
  restingHeartRate: profile?.biological?.restingHeartRate || "",
  injuries: profile?.medical?.injuries?.join(", ") || "",
  chronicConditions: profile?.medical?.chronicConditions?.join(", ") || "",
  medications: profile?.medical?.medications?.join(", ") || "",
  medicalNotes: profile?.medical?.notes || "",
  yearsTraining: profile?.trainingHistory?.yearsTraining || "",
  currentWorkoutType: profile?.trainingHistory?.currentWorkoutType || "both",
  weeklyFrequency: profile?.trainingHistory?.weeklyFrequency || "",
  recentTrainingNotes: profile?.trainingHistory?.recentTrainingNotes || "",
  primaryGoal: profile?.goals?.primary || "",
  secondaryGoals: profile?.goals?.secondary?.join(", ") || "",
  targetTimeline: profile?.goals?.targetTimeline || "",
  motivation: profile?.goals?.motivation || "",
  location: profile?.preferences?.location || "both",
  equipment: profile?.preferences?.equipment?.join(", ") || "bodyweight, dumbbells",
  duration: profile?.preferences?.duration || "40",
  intensity: profile?.preferences?.intensity || "moderate",
  workoutDays: profile?.preferences?.workoutDays?.join(", ") || "Mon, Wed, Fri",
});

const buildPayload = (form) => ({
  physical: {
    age: form.age,
    gender: form.gender,
    height: form.height,
    weight: form.weight,
    bodyFat: form.bodyFat ? Number(form.bodyFat) : null,
  },
  biological: {
    activityLevel: form.activityLevel,
    sleepHours: form.sleepHours,
    restingHeartRate: form.restingHeartRate ? Number(form.restingHeartRate) : null,
  },
  medical: {
    injuries: toList(form.injuries),
    chronicConditions: toList(form.chronicConditions),
    medications: toList(form.medications),
    notes: form.medicalNotes,
  },
  trainingHistory: {
    yearsTraining: form.yearsTraining,
    currentWorkoutType: form.currentWorkoutType,
    weeklyFrequency: form.weeklyFrequency,
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
    duration: form.duration,
    intensity: form.intensity,
    workoutDays: toList(form.workoutDays),
  },
});

const Onboarding = () => {
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();
  const { updateUser } = useAuth();

  const bmi = useMemo(() => {
    if (!form.height || !form.weight) return "--";
    const heightM = Number(form.height) / 100;
    return (Number(form.weight) / (heightM * heightM)).toFixed(1);
  }, [form.height, form.weight]);

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
    const selected = new Set(toList(form.workoutDays));
    if (selected.has(day)) selected.delete(day);
    else selected.add(day);
    setForm((current) => ({ ...current, workoutDays: Array.from(selected).join(", ") }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
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
          <span>Fitlife AI onboarding</span>
          <h1>Build the profile your coach should have had from day one.</h1>
          <p>
            Fitlife uses physical, biological, medical, training, goal, and equipment context before
            recommending a workout plan.
          </p>
        </div>
        <aside>
          <small>Live profile signal</small>
          <strong>{bmi}</strong>
          <p>BMI is calculated locally and stored with your AI profile.</p>
        </aside>
      </section>

      <form className="onboarding-form" onSubmit={handleSubmit}>
        <section className="onboarding-card">
          <h2>Body and recovery</h2>
          <div className="onboarding-grid">
            <label>Age<input name="age" type="number" value={form.age} onChange={handleChange} required /></label>
            <label>Gender<select name="gender" value={form.gender} onChange={handleChange} required><option value="">Select</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></label>
            <label>Height (cm)<input name="height" type="number" value={form.height} onChange={handleChange} required /></label>
            <label>Weight (kg)<input name="weight" type="number" value={form.weight} onChange={handleChange} required /></label>
            <label>Body fat %<input name="bodyFat" type="number" value={form.bodyFat} onChange={handleChange} /></label>
            <label>Sleep hours<input name="sleepHours" type="number" value={form.sleepHours} onChange={handleChange} required /></label>
            <label>Activity level<select name="activityLevel" value={form.activityLevel} onChange={handleChange}><option value="sedentary">Sedentary</option><option value="light">Light</option><option value="moderate">Moderate</option><option value="active">Active</option><option value="very_active">Very active</option></select></label>
            <label>Resting heart rate<input name="restingHeartRate" type="number" value={form.restingHeartRate} onChange={handleChange} /></label>
          </div>
        </section>

        <section className="onboarding-card">
          <h2>Medical guardrails</h2>
          <div className="onboarding-grid two">
            <label>Injuries<input name="injuries" value={form.injuries} onChange={handleChange} placeholder="knee pain, lower back tightness" /></label>
            <label>Chronic conditions<input name="chronicConditions" value={form.chronicConditions} onChange={handleChange} placeholder="asthma, diabetes, none" /></label>
            <label>Medications<input name="medications" value={form.medications} onChange={handleChange} placeholder="optional" /></label>
            <label>Medical notes<input name="medicalNotes" value={form.medicalNotes} onChange={handleChange} placeholder="anything Fitlife should be careful about" /></label>
          </div>
        </section>

        <section className="onboarding-card">
          <h2>Training and goals</h2>
          <div className="onboarding-grid">
            <label>Years training<input name="yearsTraining" type="number" value={form.yearsTraining} onChange={handleChange} required /></label>
            <label>Current workout<select name="currentWorkoutType" value={form.currentWorkoutType} onChange={handleChange}><option value="home">Home</option><option value="gym">Gym</option><option value="both">Both</option></select></label>
            <label>Weekly frequency<input name="weeklyFrequency" type="number" min="1" max="7" value={form.weeklyFrequency} onChange={handleChange} required /></label>
            <label>Primary goal<select name="primaryGoal" value={form.primaryGoal} onChange={handleChange} required><option value="">Select</option><option value="weight_loss">Weight loss</option><option value="muscle_gain">Muscle gain</option><option value="maintain">Maintain</option><option value="endurance">Endurance</option><option value="strength">Strength</option><option value="rehab">Rehab and mobility</option></select></label>
            <label>Secondary goals<input name="secondaryGoals" value={form.secondaryGoals} onChange={handleChange} /></label>
            <label>Timeline<input name="targetTimeline" value={form.targetTimeline} onChange={handleChange} placeholder="12 weeks, 6 months" /></label>
            <label className="wide">Motivation<input name="motivation" value={form.motivation} onChange={handleChange} placeholder="why this goal matters" /></label>
            <label className="wide">Recent training notes<input name="recentTrainingNotes" value={form.recentTrainingNotes} onChange={handleChange} /></label>
          </div>
        </section>

        <section className="onboarding-card">
          <h2>Workout preferences</h2>
          <div className="onboarding-grid">
            <label>Location<select name="location" value={form.location} onChange={handleChange}><option value="home">Home</option><option value="gym">Gym</option><option value="both">Both</option></select></label>
            <label>Equipment<input name="equipment" value={form.equipment} onChange={handleChange} required /></label>
            <label>Duration (minutes)<input name="duration" type="number" value={form.duration} onChange={handleChange} required /></label>
            <label>Intensity<select name="intensity" value={form.intensity} onChange={handleChange}><option value="gentle">Gentle</option><option value="moderate">Moderate</option><option value="hard">Hard</option></select></label>
          </div>
          <div className="day-picker">
            {days.map((day) => (
              <button key={day} type="button" className={toList(form.workoutDays).includes(day) ? "active" : ""} onClick={() => handleDayToggle(day)}>
                {day}
              </button>
            ))}
          </div>
        </section>

        <button className="onboarding-submit" type="submit" disabled={saving}>
          {saving ? "Building your AI plan..." : "Save profile and generate AI plan"}
        </button>
      </form>
    </main>
  );
};

export default Onboarding;
