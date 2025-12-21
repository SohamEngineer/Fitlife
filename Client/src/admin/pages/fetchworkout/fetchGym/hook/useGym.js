import { useEffect, useState } from "react";
import { fetchGymWorkouts } from "../../../../../api/admin/fetchworkout.api";
import { deleteGymWorkout } from "../../../../../api/admin/deleteWorkout.api";
import { updateGymWorkout } from "../../../../../api/admin/updateWorkout.api";

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

function useFetchGym() {
  /* ------------------------------- State -------------------------------- */
  const [gymWorkouts, setGymWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [formData, setFormData] = useState(initialFormState);

  /* ------------------------------ Effects ------------------------------- */
  useEffect(() => {
    loadWorkouts();
  }, []);

  /* ------------------------------ API Calls ------------------------------ */
  const loadWorkouts = async () => {
    try {
      const data = await fetchGymWorkouts();
      setGymWorkouts(data);
    } catch (error) {
      console.error("Failed to load workouts:", error);
    }
  };

  const deleteWorkout = async (id) => {
    if (!window.confirm("Delete this workout?")) return;

    try {
      await deleteGymWorkout(id);
      setGymWorkouts((prev) => prev.filter((w) => w._id !== id));
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const updateWorkout = async () => {
    if (!editingWorkout) return;

    try {
      const payload = buildFormData(formData);
      await updateGymWorkout(editingWorkout._id, payload);

      resetEditState();
      loadWorkouts();
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
    gymWorkouts,
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

export default useFetchGym;
