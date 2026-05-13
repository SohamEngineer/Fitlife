import React from "react";
// import { addHomeWorkout } from "../../../api/home.api";
import "./style/addhome.css";
import useAddhome from "./hook/useAddhome";

const AddHome = () => {
  const { handleChange, handleSubmit } = useAddhome();

  return (
    <div className="admin-form-shell">
      <section className="admin-form-hero">
        <p className="admin-eyebrow">Home catalog</p>
        <h1>Add Home Workout</h1>
        <span>Create bodyweight or minimal-equipment workouts for users training at home.</span>
      </section>

      <div className="add-form-container">
        <div className="form-title-block">
          <p className="admin-eyebrow">Workout details</p>
          <h2 className="form-title">New home workout</h2>
        </div>

        <form onSubmit={handleSubmit} className="add-form">
          <label className="form-field full-width">
            <span>Workout title</span>
            <input
              type="text"
              name="title"
              placeholder="Example: Low-impact cardio circuit"
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <div className="type-day-container">
            <label className="form-field">
              <span>Workout type</span>
              <select
                name="type"
                defaultValue=""
                onChange={handleChange}
                className="form-input"
              >
                <option value="" disabled>Select workout type</option>
                <option value="Full Body">Full Body</option>
                <option value="Upper">Upper</option>
                <option value="Lower">Lower</option>
                <option value="Core">Core</option>
                <option value="Cardio">Cardio</option>
              </select>
            </label>

            <label className="form-field">
              <span>Program day</span>
              <select
                name="day"
                defaultValue=""
                onChange={handleChange}
                className="form-input"
              >
                <option value="" disabled>Select day</option>
                {Array.from({ length: 30 }).map((_, i) => (
                  <option key={i} value={`Day ${i + 1}`}>
                    Day {i + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="form-field full-width">
            <span>Description</span>
            <textarea
              name="description"
              placeholder="Sets, reps, coaching cue, and safety notes"
              onChange={handleChange}
              className="form-textarea"
            />
          </label>

          <label className="form-field full-width">
            <span>Calories burned</span>
            <input
              type="number"
              name="caloryburn"
              placeholder="Example: 120"
              onChange={handleChange}
              className="form-input"
            />
          </label>

          <label className="form-field full-width">
            <span>Workout video</span>
            <div className="file-drop">
              <strong>Upload animation/video</strong>
              <small>MP4 recommended for clean playback in workout mode.</small>
              <input
                type="file"
                name="video"
                accept="video/*"
                onChange={handleChange}
                className="form-file"
              />
            </div>
          </label>

          <button type="submit" className="submit-button">
            Add Home Workout
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddHome;
