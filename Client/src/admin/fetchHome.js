import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './fetchHome.css';

const HomeWorkoutTable = () => {
  const [homeWorkouts, setHomeWorkouts] = useState([]);
  const [editingWorkout, setEditingWorkout] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    type: "",
    day: "",
    caloryburn: "",
    description: "",
    video: null,

  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios.get('http://localhost:8000/api/homeworkout')
      .then(res => setHomeWorkouts(res.data))
      .catch(err => console.error("Error fetching workouts:", err));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this workout?")) {
      try {
        await axios.delete(`http://localhost:8000/api/admin/homeworkout/${id}`);
        setHomeWorkouts(prev => prev.filter(item => item._id !== id));
      } catch (error) {
        console.error("Error deleting:", error);
      }
    }
  };

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

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        video: file,
        videoPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();
      data.append("title", formData.title);
      data.append("type", formData.type);
      data.append("day", formData.day);
      data.append("caloryburn", formData.caloryburn);
      data.append("description", formData.description);
      if (formData.video) {
        data.append("video", formData.video);
      }

      await axios.put(`http://localhost:8000/api/admin/homeworkout/${editingWorkout._id}`,data,
  {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

      setEditingWorkout(null);
      fetchData();
    } catch (error) {
      console.error("Error updating workout:", error);
    }
  };

  return (
    <div className="homeworkout-container">
      <h2>🏋️ Home Workouts</h2>
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
          {homeWorkouts.map((workout) => (
            <tr key={workout._id}>
              <td>{workout.title}</td>
              <td>{workout.type}</td>
              <td>{workout.day}</td>
              <td>{workout.caloryburn}</td>
              <td className='description'>{workout.description}</td>
              <td>
                {workout.video && (
                  <video width="100" height="60" autoPlay loop muted playsInline>
            <source src={workout.videoBase64} type="video/mp4" />
          </video>
                )}
              </td>
              <td>
                <button onClick={() => handleEditClick(workout)} className="edit-btn">Edit</button>
                <button onClick={() => handleDelete(workout._id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingWorkout && (
        <div className="edit-modal">
          <div className="modal-content">
            <h3>Edit Workout</h3>
            <input name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
            <input name="type" value={formData.type} onChange={handleChange} placeholder="Type" />
            <input name="day" value={formData.day} onChange={handleChange} placeholder="Day" />
            <input name="caloryburn" value={formData.caloryburn} onChange={handleChange} placeholder="Calories" />
            <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description"></textarea>
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
              <button onClick={handleUpdate} className="update-btn">Update</button>
              <button onClick={() => setEditingWorkout(null)} className="cancel-btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeWorkoutTable;
