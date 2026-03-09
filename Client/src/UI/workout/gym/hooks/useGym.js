import { useEffect, useState } from "react";
import { getAllGymWorkoutsApi } from "../../../../api/gymworkout.api";
import { useNavigate } from "react-router-dom";

export  function useGym(){
 const [selectedDay, setSelectedDay] = useState(1);
  const [filter, setFilter] = useState("Full Body");
  const [allWorkouts, setAllWorkouts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Restore selected day from localStorage
  useEffect(() => {
    const savedDay = localStorage.getItem("gymWorkoutSelectedDay");
    if (savedDay) setSelectedDay(parseInt(savedDay));
  }, []);

  // Fetch workouts when component loads
  useEffect(() => {
    const fetchWorkouts = async () => {
      setIsLoading(true);
      try {
        const data = await getAllGymWorkoutsApi();
        setAllWorkouts(data);
      } catch (error) {
        console.error("Error fetching workouts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchWorkouts();
  }, []);

  // Filter based on day + workout type
  const todayWorkout = allWorkouts.filter(
    (w) => w.type === filter && w.day === `Day ${selectedDay}`
  );

  const handleDaySelect = (day) => {
    setSelectedDay(day);
    localStorage.setItem("gymWorkoutSelectedDay", day);
  };

  const handleWorkoutClick = (id) => {
    navigate(`/gymworkout/${id}`);
  };

  const workoutTypes = [
    { 
      value: "Full Body", 
      icon: "💪", 
      color: "orange",
      description: "Complete body workout"
    },
    { 
      value: "Upper", 
      icon: "🏋️", 
      color: "blue",
      description: "Chest, arms & shoulders"
    },
    { 
      value: "Lower", 
      icon: "🦵", 
      color: "green",
      description: "Legs & lower body"
    },
    { 
      value: "Core", 
      icon: "⚡", 
      color: "yellow",
      description: "Core strength & stability"
    },
    { 
      value: "Cardio", 
      icon: "❤️", 
      color: "red",
      description: "Heart rate & endurance"
    },
  ];

  const currentType = workoutTypes.find(t => t.value === filter);
  const completedDays = selectedDay - 1;
  const progressPercent = (completedDays / 30) * 100;
  return{
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
    navigate
  }
}