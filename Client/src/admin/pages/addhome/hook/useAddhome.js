import  { useState } from 'react'
// import { addHomeWorkout } from '../../../../api/admin/home.api';
import Swal from 'sweetalert2';
import { addHomeWorkout } from '../../../../api/admin/addworkout.api';

function useAddhome() {
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

    if (!title || !type || !day || !description || !caloryburn || !video) {
      Swal.fire("Validation Error", "Please fill in all fields.", "warning");
      return;
    }

    const formData = new FormData();
    Object.entries(form).forEach(([key, value]) => formData.append(key, value));

    try {
      const data = await addHomeWorkout(formData);

      Swal.fire("Success", data.message || "Workout added successfully!", "success");

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
      Swal.fire("Error", err.message || "Something went wrong.", "error");
    }
  };
  return {
    handleChange,
    handleSubmit
  }
}

export default useAddhome