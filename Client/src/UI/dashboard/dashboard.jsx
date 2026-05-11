import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { generateAIPlanApi, getCurrentAIPlanApi, getDeepProfileApi } from "../../api/personalization.api";
import { useAuth } from "../../context/authcontext";
import "./dashboard.css";

const Dashboard = () => {
  const [profile, setProfile] = useState(null);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [planLoadError, setPlanLoadError] = useState("");
  const { authUser, logout } = useAuth();
  const navigate = useNavigate();

  const user = authUser || JSON.parse(localStorage.getItem("user") || "null");
  const firstDay = plan?.weeklyPlan?.[0];

  const completionCopy = useMemo(() => {
    if (!profile) return "Profile not loaded";
    const injuryCount = profile.medical?.injuries?.length || 0;
    return injuryCount
      ? `${injuryCount} safety guardrail${injuryCount > 1 ? "s" : ""} active`
      : "No injury guardrails flagged";
  }, [profile]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const profileData = await getDeepProfileApi();
        setProfile(profileData.profile);

        try {
          const planData = await getCurrentAIPlanApi();
          setPlan(planData.plan);
          setPlanLoadError("");
        } catch (planError) {
          if (planError.response?.status === 401) throw planError;
          setPlan(null);
          setPlanLoadError(planError.response?.data?.message || "Current AI plan could not be loaded yet.");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          logout();
          Swal.fire("Session expired", "Please log in again so Fitlife can securely load your saved profile.", "warning");
          navigate("/");
          return;
        }

        Swal.fire(
          "Dashboard error",
          error.response?.data?.message || "Unable to load your saved Fitlife profile.",
          "error"
        );
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, [logout, navigate]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const data = await generateAIPlanApi();
      setPlan(data.plan);
      Swal.fire("AI plan ready", "Fitlife rebuilt your plan from your current profile.", "success");
    } catch (error) {
      Swal.fire("Plan generation paused", error.response?.data?.message || "Claude is not configured yet.", "info");
    } finally {
      setGenerating(false);
    }
  };

  const handleStartDay = () => {
    const matched = firstDay?.exercises?.filter((exercise) => exercise.source === "fitlife_library" && exercise.workoutId);
    if (!matched?.length) {
      Swal.fire("No matched videos yet", "This AI plan includes fallback exercises without Fitlife videos.", "info");
      return;
    }

    const first = matched[0];
    navigate(first.workoutLocation === "gym" ? `/gymworkout/${first.workoutId}` : `/homeworkout/${first.workoutId}`);
  };

  if (loading) return <div className="ai-dashboard-loading">Loading AI dashboard...</div>;

  return (
    <main className="ai-dashboard">
      <section className="ai-dashboard-hero">
        <div>
          <span>Fitlife AI Coach</span>
          <h1>Welcome back, {user?.name || "athlete"}.</h1>
          <p>
            Your dashboard combines profile context, recovery signals, safety guardrails, and
            Fitlife workout videos into one adaptive coaching plan.
          </p>
          <div className="ai-dashboard-actions">
            <button onClick={handleGenerate} disabled={generating || (plan && !user?.isPremium)}>
              {generating ? "Generating..." : plan ? "Regenerate plan" : "Generate AI plan"}
            </button>
            <Link to="/onboarding">Edit personalization</Link>
          </div>
          {plan && !user?.isPremium && (
            <p className="premium-note">Free plan active. Premium unlocks regeneration, history, and FitBot.</p>
          )}
          {planLoadError && <p className="dashboard-inline-note">{planLoadError}</p>}
        </div>
        <aside className="readiness-card">
          <small>Readiness score</small>
          <strong>{plan?.assessment?.readinessScore || "--"}</strong>
          <p>{plan?.assessment?.trainingLoad || completionCopy}</p>
        </aside>
      </section>

      <section className="dashboard-grid">
        <article className="dashboard-panel assessment-panel">
          <h2>AI assessment</h2>
          {plan ? (
            <>
              <p>{plan.assessment?.summary}</p>
              <div className="assessment-tags">
                <span>{plan.assessment?.planStyle}</span>
                <span>{plan.assessment?.trainingLoad}</span>
                <span>{profile?.preferences?.duration} min sessions</span>
              </div>
            </>
          ) : (
            <div className="empty-ai-state">
              <h3>No AI plan yet</h3>
              <p>Generate your first plan after completing onboarding.</p>
              <button onClick={handleGenerate} disabled={generating}>Generate plan</button>
            </div>
          )}
        </article>

        <article className="dashboard-panel">
          <h2>Warnings</h2>
          <ul className="dashboard-list">
            {(plan?.warnings?.length ? plan.warnings : ["Complete your AI plan to see safety notes."]).map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </article>

        <article className="dashboard-panel">
          <h2>Dietary tips</h2>
          <ul className="dashboard-list">
            {(plan?.dietaryTips?.length ? plan.dietaryTips : ["Your nutrition tips will appear with your generated plan."]).map((tip) => (
              <li key={tip}>{tip}</li>
            ))}
          </ul>
        </article>
      </section>

      {plan && (
        <section className="weekly-plan">
          <div className="section-heading-row">
            <div>
              <span>Current AI plan</span>
              <h2>Week version {plan.version}</h2>
            </div>
            <button onClick={handleStartDay}>Start first matched workout</button>
          </div>

          <div className="plan-day-grid">
            {plan.weeklyPlan?.map((day) => (
              <article className="plan-day-card" key={`${plan._id}-${day.day}`}>
                <span>{day.day} · {day.intensity}</span>
                <h3>{day.focus}</h3>
                <p>{day.duration} minutes</p>
                <ul>
                  {day.exercises.map((exercise) => (
                    <li key={`${day.day}-${exercise.title}`}>
                      <strong>{exercise.title}</strong>
                      <small>
                        {exercise.sets} sets · {exercise.reps} · {exercise.restSec}s rest · {exercise.source === "fitlife_library" ? "Fitlife video" : "AI fallback"}
                      </small>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
};

export default Dashboard;
