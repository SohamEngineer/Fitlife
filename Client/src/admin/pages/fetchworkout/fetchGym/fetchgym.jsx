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
      <h2>🏋️ Gym Workouts</h2>
      <table className="homeworkout-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Day</th>
            <th>Calories Burn</th>
            <th >Description</th>
            <th>Video</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {gymWorkouts.map((workout) => (
            <tr key={workout._id}>
              <td data-label="Title">{workout.title}</td>
              <td data-label="Type">{workout.type}</td>
              <td data-label="Day">{workout.day}</td>
              <td data-label="Calories Burn">{workout.caloryburn}</td>
              <td className="description" data-label="Description">{workout.description}</td>
              <td data-label="Video">
                {workout.video && (
                  <video width="100" height="60" autoPlay loop muted playsInline>
                    <source src={workout.videoBase64} type="video/mp4" />
                  </video>
                )}
              </td>
              <td data-label="Actions">
                <button onClick={() => handleEditClick(workout)} className="edit-btn">Edit</button>
                <button onClick={() => deleteWorkout(workout._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>

      </table>

      {editingWorkout && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Workout</h3>
            <input name="title" value={formData.title} onChange={handleInputChange} placeholder="Title" />
            <input name="type" value={formData.type} onChange={handleInputChange} placeholder="Type" />
            <input name="day" value={formData.day} onChange={handleInputChange} placeholder="Day" />
            <input name="caloryburn" value={formData.caloryburn} onChange={handleInputChange} placeholder="Calories" />
            <textarea name="description" value={formData.description} onChange={handleInputChange} placeholder="Description"></textarea>
            <input type="file" name="video" accept="video/*" onChange={handleVideoChange} />
            {formData.videoPreview && (
              <div className="video-preview">
                <p>Video Preview:</p>
                <video width="300" height="200" controls>
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
