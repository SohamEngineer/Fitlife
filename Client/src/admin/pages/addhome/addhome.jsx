import React from "react";
// import { addHomeWorkout } from "../../../api/home.api";
import "./style/addhome.css";
import useAddhome from "./hook/useAddhome";

const AddHome = () => {
  const { handleChange, handleSubmit } = useAddhome();

  return (
    <div className="add-form-container">
      <h2 className="form-title">Add Home Workout</h2>

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
            defaultValue=""
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
            defaultValue=""
            onChange={handleChange}
            className="form-input half-width"
          >
            <option value="" disabled>Select Day</option>
            {Array.from({ length: 30 }).map((_, i) => (
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

export default AddHome;
