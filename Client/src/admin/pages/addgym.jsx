import React, { useState } from "react";
import Swal from "sweetalert2";
import "../style/addhome.css";
import { addGymWorkout } from "../../api/admin/gym.api";

const AddGym = () => {
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

  return (
    <div className="add-form-container">
      <h2 className="form-title">Add Gym Workout</h2>

      <form onSubmit={handleSubmit} className="add-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={handleChange}
          className="form-input"
        />

        <div className="type-day-container">
          <select
            name="type"
            onChange={handleChange}
            className="form-input half-width"
          >
            <option value="" disabled>Select Workout Type</option>
            <option value="Full Body">Full Body</option>
            <option value="Upper">Upper</option>
            <option value="Lower">Lower</option>
            <option value="Core">Core</option>
            <option value="Cardio">Cardio</option>
          </select>

          <select
            name="day"
            onChange={handleChange}
            className="form-input half-width"
          >
            <option value="" disabled>Select Day</option>
            {Array.from({ length: 30 }, (_, i) => (
              <option key={i} value={`Day ${i + 1}`}>
                Day {i + 1}
              </option>
            ))}
          </select>
        </div>

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="form-textarea"
        />

        <input
          type="number"
          name="caloryburn"
          placeholder="Calories Burned"
          onChange={handleChange}
          className="form-input"
        />

        <input
          type="file"
          name="video"
          accept="video/*"
          onChange={handleChange}
          className="form-file"
        />

        <button type="submit" className="submit-button">
          Add Workout
        </button>
      </form>
    </div>
  );
};

export default AddGym;
