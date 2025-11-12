import React, { useState } from "react";
import axios from "axios";
import "./addhome.css";
import Swal from "sweetalert2";

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
    if (name === "video") {
      setForm({ ...form, video: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.type || !form.description || !form.caloryburn || !form.video || !form.day) {
      Swal.fire("Validation Error", "Please fill in all fields and upload a video.", "warning");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("type", form.type);
    formData.append("day", form.day);
    formData.append("description", form.description);
    formData.append("caloryburn", form.caloryburn);
    formData.append("video", form.video);

    try {
      const res = await axios.post("http://localhost:8000/api/gymworkout/add", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire("Success", res.data.message || "Workout added successfully!", "success");

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
      console.error("Error adding workout:", err);
      Swal.fire("Error", "Something went wrong while adding the workout.", "error");
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
            defaultValue=""
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
            defaultValue=""
          >
            <option value="" disabled>Select Day</option>
            {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
              <option key={day} value={`Day ${day}`}>Day {day}</option>
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

        <button type="submit" className="submit-button">Add Workout</button>
      </form>
    </div>
  );
};

export default AddGym;
