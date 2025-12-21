import { useEffect, useState } from "react";
import {
  getFitnessDataApi,
  addFitnessEntryApi,
  updateFitnessEntryApi,
  deleteFitnessEntryApi,
} from "../../../api/track.api";

const useTrack = () => {
  const [fitData, setFitData] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    workout_name: "",
    activity: "",
    weight: "",
    fat: "",
    bmi: "",
    date: "",
  });

  const userId = JSON.parse(localStorage.getItem("user"))?.id;

  // ------------------
  // Fetch data
  // ------------------
  const fetchData = async () => {
    if (!userId) return;

    try {
      const data = await getFitnessDataApi(userId);
      setFitData(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ------------------
  // Handle input change
  // ------------------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ------------------
  // Submit (ADD / UPDATE)
  // ------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateFitnessEntryApi(editingId, form);
      } else {
        await addFitnessEntryApi({ ...form, userId });
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error("Submit error:", error);
    }
  };

  // ------------------
  // Edit
  // ------------------
  const handleEdit = (item) => {
    setEditingId(item._id);
    setShowForm(true);

    setForm({
      workout_name: item.workout_name,
      activity: item.activity,
      weight: item.weight,
      fat: item.fat,
      bmi: item.bmi,
      date: item.date.split("T")[0],
    });
  };

  // ------------------
  // Delete
  // ------------------
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this record?")) return;

    try {
      await deleteFitnessEntryApi(id);
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  // ------------------
  // Reset form
  // ------------------
  const resetForm = () => {
    setForm({
      workout_name: "",
      activity: "",
      weight: "",
      fat: "",
      bmi: "",
      date: "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  return {
    fitData,
    showForm,
    setShowForm,
    form,
    editingId,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
  };
};

export default useTrack;
