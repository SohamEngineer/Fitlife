import  { useState } from 'react'
import Swal from 'sweetalert2';
import { addGymWorkout } from '../../../../api/admin/addworkout.api';

function useAddgym() {
    const [form, setForm] = useState({
    title: "",
    type: "",
    day: "",
    description: "",
    caloryburn: "",
    video: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "video" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, type, day, description, caloryburn, video } = form;

    if (
  !title.trim() ||
  !type.trim() ||
  !day.trim() ||
  !description.trim() ||
  caloryburn === "" ||
  !video
) {
  Swal.fire("Validation Error", "Please fill all fields.", "warning");
  return;
}


    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      const data = await addGymWorkout(formData);

      Swal.fire("Success", data.message || "Workout added!", "success");

      setForm({
        title: "",
        type: "",
        day: "",
        description: "",
        caloryburn: "",
        video: null,
      });

      document.querySelector("form").reset();
    } catch (err) {
      Swal.fire("Error", err.message || "Failed to add workout.", "error");
    }
  };
  return {
    handleChange,
    handleSubmit
  }
}

export default useAddgym