import { useEffect, useState } from "react";
import { getAllGymWorkoutsApi } from "../../../../api/gymworkout.api";
import { getCurrentAIPlanApi } from "../../../../api/personalization.api";
import { useNavigate } from "react-router-dom";

export function useGym(){

  const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState("Full Body");
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [aiPlan, setAiPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // premium check
  const isPrime = Boolean(JSON.parse(localStorage.getItem("user") || "null")?.isPremium);

  // restore selected day
  useEffect(() => {
    const savedDay = localStorage.getItem("gymWorkoutSelectedDay");
    if (savedDay) setSelectedDay(parseInt(savedDay));
  }, []);

  useEffect(() => {
    const loadPlan = async () => {
      try {
        const data = await getCurrentAIPlanApi();
        setAiPlan(data.plan);
      } catch (error) {
        setAiPlan(null);
      }
    };

    loadPlan();
  }, []);

  // fetch workouts
  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);

      try {
        const data = await getAllGymWorkoutsApi();
        setAllWorkouts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchWorkouts();
  }, []);

  // restrict workouts for free users
  const todayWorkout = allWorkouts.filter((w) => {

    const workoutDay = Number(w.day.replace("Day ", ""));

    if (!isPrime && workoutDay > 7) {
      return false;
    }

    return w.type === filter && workoutDay === selectedDay;
  });

  const handleDaySelect = (day) => {

    if (!isPrime && day > 7) {
      alert("Upgrade to Premium to unlock full gym workout plan");
      navigate("/membership");
      return;
    }

    setSelectedDay(day);
    localStorage.setItem("gymWorkoutSelectedDay", day);
  };

  const handleWorkoutClick = (id) => {

    if (!isPrime && selectedDay > 7) {
      alert("Upgrade to Premium to access this workout");
      navigate("/membership");
      return;
    }

    navigate(`/gymworkout/${id}`);
  };

  const workoutTypes = [
    { value: "Full Body", icon: "💪", color: "orange", description: "Complete body workout" },
    { value: "Upper", icon: "🏋️", color: "blue", description: "Chest, arms & shoulders" },
    { value: "Lower", icon: "🦵", color: "green", description: "Legs & lower body" },
    { value: "Core", icon: "⚡", color: "yellow", description: "Core strength & stability" },
    { value: "Cardio", icon: "❤️", color: "red", description: "Heart rate & endurance" },
  ];

  const currentType = workoutTypes.find(t => t.value === filter);

  const completedDays = selectedDay - 1;

  const progressPercent = (completedDays / 30) * 100;
  const forYouExercises = aiPlan?.weeklyPlan
    ?.flatMap((day) => day.exercises.map((exercise) => ({ ...exercise, day: day.day, focus: day.focus })))
    .filter((exercise) => exercise.workoutLocation === "gym") || [];

  return {
    currentType,
    progressPercent,
    handleWorkoutClick,
    handleDaySelect,
    isLoading,
    todayWorkout,
    setFilter,
    filter,
    selectedDay,
    completedDays,
    workoutTypes,
    navigate,
    isPrime,
    aiPlan,
    forYouExercises
  }
}
