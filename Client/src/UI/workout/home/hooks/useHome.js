import { useEffect, useState } from "react";
import { getAllHomeWorkoutsApi } from "../../../../api/homeworkout.api";
import { getCurrentAIPlanApi } from "../../../../api/personalization.api";
import { useNavigate } from "react-router-dom";

export default function useHome() {

  const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState("Full Body");
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [aiPlan, setAiPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  // check premium status
  const isPrime = Boolean(JSON.parse(localStorage.getItem("user") || "null")?.isPremium);

  // Load selected day from storage
  useEffect(() => {
    const saved = localStorage.getItem("homeWorkoutSelectedDay");
    if (saved) {
      setSelectedDay(Number(saved));
    }
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

  // Fetch workouts
  useEffect(() => {
    const loadWorkouts = async () => {
      setIsLoading(true);

      try {
        const data = await getAllHomeWorkoutsApi();
        setAllWorkouts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching home workouts:", err);
      } finally {
        setIsLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  // Filter workouts with premium restriction
  const todayWorkout = allWorkouts.filter((w) => {

    const workoutDay = Number(w.day.replace("Day ", ""));

    // free users only access first 7 days
    if (!isPrime && workoutDay > 7) {
      return false;
    }

    return w.type === filter && workoutDay === selectedDay;
  });

  // Select training day
  const handleDaySelect = (day) => {

    if (!isPrime && day > 7) {
      alert("Upgrade to Premium to unlock full 30 day workout plan");
      navigate("/membership");
      return;
    }

    setSelectedDay(day);
    localStorage.setItem("homeWorkoutSelectedDay", day);
  };

  // Start workout
  const handleStart = () => {

    if (!isPrime && selectedDay > 7) {
      alert("Upgrade to Premium to unlock this workout");
      navigate("/membership");
      return;
    }

    if (todayWorkout.length > 0) {
      navigate("/start-workout", {
        state: { workouts: todayWorkout },
      });
    }
  };

  // Workout categories
  const workoutTypes = [
    {
      value: "Full Body",
      icon: "🏃‍♂️",
      color: "purple",
      description: "Total body conditioning",
    },
    {
      value: "Upper",
      icon: "💪",
      color: "blue",
      description: "Arms, chest & back",
    },
    {
      value: "Lower",
      icon: "🦵",
      color: "green",
      description: "Legs & glutes focus",
    },
    {
      value: "Core",
      icon: "⭐",
      color: "yellow",
      description: "Abs & stability",
    },
    {
      value: "Cardio",
      icon: "❤️",
      color: "red",
      description: "Heart health & endurance",
    },
  ];

  const currentType = workoutTypes.find((t) => t.value === filter);

  const completedDays = selectedDay - 1;

  const progressPercent = (completedDays / 30) * 100;
  const forYouExercises = aiPlan?.weeklyPlan
    ?.flatMap((day) => day.exercises.map((exercise) => ({ ...exercise, day: day.day, focus: day.focus })))
    .filter((exercise) => exercise.workoutLocation === "home") || [];

  return {
    currentType,
    progressPercent,
    handleStart,
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
  };
}
