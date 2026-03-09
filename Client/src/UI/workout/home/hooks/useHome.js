import { useEffect, useState } from "react";
import { getAllHomeWorkoutsApi } from "../../../../api/homeworkout.api";
import { useNavigate } from "react-router-dom";

export default function useHome(){
const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState("Full Body");
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Load selected day from storage
  useEffect(() => {
    const saved = localStorage.getItem("homeWorkoutSelectedDay");
    if (saved) setSelectedDay(Number(saved));
  }, []);

  // Fetch all workouts once
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

  // Filter workouts
  const todayWorkout = allWorkouts.filter(
    (w) => w.type === filter && w.day === `Day ${selectedDay}`
  );

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    localStorage.setItem("homeWorkoutSelectedDay", day);
  };

  const handleStart = () => {
    if (todayWorkout.length > 0) {
      navigate("/start-workout", { state: { workouts: todayWorkout } });
    }
  };

  const workoutTypes = [
    { 
      value: "Full Body", 
      icon: "🏃‍♂️", 
      color: "purple",
      description: "Total body conditioning"
    },
    { 
      value: "Upper", 
      icon: "💪", 
      color: "blue",
      description: "Arms, chest & back"
    },
    { 
      value: "Lower", 
      icon: "🦵", 
      color: "green",
      description: "Legs & glutes focus"
    },
    { 
      value: "Core", 
      icon: "⭐", 
      color: "yellow",
      description: "Abs & stability"
    },
    { 
      value: "Cardio", 
      icon: "❤️", 
      color: "red",
      description: "Heart health & endurance"
    },
  ];

  const currentType = workoutTypes.find(t => t.value === filter);
  const completedDays = selectedDay - 1;
  const progressPercent = (completedDays / 30) * 100;
return{
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
    navigate
}
}