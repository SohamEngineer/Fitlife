import { useEffect, useState } from "react";
import { fetchHomeWorkouts } from "../../../../../api/admin/fetchworkout.api";
import { deleteHomeWorkout } from "../../../../../api/admin/deleteWorkout.api";
import { updateHomeWorkout } from "../../../../../api/admin/updateWorkout.api";

/* ----------------------------- Initial State ----------------------------- */
const initialFormState = {
  title: "",
  type: "",
  day: "",
  caloryburn: "",
  description: "",
  video: null,
  videoPreview: "",
};

function useFetchHomeWorkout() {
  /* ------------------------------- State -------------------------------- */
  const [homeWorkouts, setHomeWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  /* ------------------------------ Effects ------------------------------- */
  useEffect(() => {
    loadHomeWorkouts();
  }, []);

  /* ------------------------------ API Calls ------------------------------ */
  const loadHomeWorkouts = async () => {
    try {
      const data = await fetchHomeWorkouts();
      setHomeWorkouts(data);
    } catch (error) {
      console.error("Failed to load home workouts:", error);
    }
  };

  const deleteWorkout = async (id) => {
    if (!window.confirm("Delete this workout?")) return;

    try {
      await deleteHomeWorkout(id);
      setHomeWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const updateWorkout = async () => {
    if (!editingWorkout) return;

    try {
      const payload = buildFormData(formData);
      await updateHomeWorkout(editingWorkout._id, payload);

      resetEditState();
      loadHomeWorkouts();
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  /* --------------------------- Event Handlers --------------------------- */
  const handleEditClick = (workout) => {
    setEditingWorkout(workout);
    setFormData({
      title: workout.title,
      type: workout.type,
      day: workout.day,
      caloryburn: workout.caloryburn,
      description: workout.description,
      video: null,
      videoPreview: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      video: file,
      videoPreview: URL.createObjectURL(file),
    }));
  };

  /* ----------------------------- Utilities ------------------------------ */
  const buildFormData = (data) => {
    const form = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (value && key !== "videoPreview") {
        form.append(key, value);
      }
    });
    return form;
  };

  const resetEditState = () => {
    setEditingWorkout(null);
    setFormData(initialFormState);
  };

  /* ------------------------------- Return ------------------------------- */
  return {
    homeWorkouts,
    formData,
    editingWorkout,
    setEditingWorkout,
    handleEditClick,
    handleInputChange,
    handleVideoChange,
    deleteWorkout,
    updateWorkout,
  };
}

export default useFetchHomeWorkout;
