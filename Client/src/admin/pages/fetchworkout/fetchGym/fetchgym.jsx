import React from 'react';
import '../style/fetchworkout.css';
import useFetchGym from './hook/useGym';

const GymWorkoutTable = () => {
  const { gymWorkouts,
    formData,
    editingWorkout,
    setEditingWorkout,
    handleEditClick,
    handleInputChange,
    handleVideoChange,
    deleteWorkout,
    updateWorkout,
  } = useFetchGym();

  return (
    <div className="homeworkout-container">
      <div className="workout-table-header">
        <div>
          <p className="admin-eyebrow">Workout library</p>
          <h2>Gym Workouts</h2>
        </div>
        <span>{gymWorkouts.length} workouts</span>
      </div>

      <div className="workout-table-scroll">
        <table className="homeworkout-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Type</th>
              <th>Day</th>
              <th>Calories</th>
              <th>Description</th>
              <th>Video</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {gymWorkouts.length > 0 ? (
              gymWorkouts.map((workout) => (
                <tr key={workout._id}>
                  <td data-label="Title">
                    <strong>{workout.title}</strong>
                  </td>
                  <td data-label="Type">
                    <span className="type-pill">{workout.type}</span>
                  </td>
                  <td data-label="Day">{workout.day}</td>
                  <td data-label="Calories">{workout.caloryburn} cal</td>
                  <td className="description" data-label="Description">{workout.description}</td>
                  <td data-label="Video">
                    {workout.video ? (
                      <video className="workout-video-thumb" autoPlay loop muted playsInline>
                        <source src={workout.videoBase64} type="video/mp4" />
                      </video>
                    ) : (
                      <span className="empty-video">No video</span>
                    )}
                  </td>
                  <td data-label="Actions">
                    <div className="table-actions">
                      <button onClick={() => handleEditClick(workout)} className="edit-btn">Edit</button>
                      <button onClick={() => deleteWorkout(workout._id)} className="delete-btn">Delete</button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="empty-workout-cell">No gym workouts found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editingWorkout && (
        <div className="edit-modal">
          <div className="modal-content">
            <div className="modal-header">
              <p className="admin-eyebrow">Edit record</p>
              <h3>Edit Gym Workout</h3>
            </div>
            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" />
            <input name="type" value={formData.type} onChange={handleInputChange} placeholder="Type" />
            <input name="day" value={formData.day} onChange={handleInputChange} placeholder="Day" />
            <input name="caloryburn" value={formData.caloryburn} onChange={handleInputChange} placeholder="Calories" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description"></textarea>
            <input type="file" name="video" accept="video/*" onChange={handleVideoChange} />
            {formData.videoPreview && (
              <div className="video-preview">
                <p>Video Preview</p>
                <video controls>
                  <source src={formData.videoPreview} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}
            <div className="modal-actions">
              <button onClick={updateWorkout} className="update-btn">Update</button>
              <button onClick={() => setEditingWorkout(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GymWorkoutTable;
