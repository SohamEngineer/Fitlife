import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/track.css';

const Track = () => {
  const [fitData, setFitData] = useState([]);
  const [form, setForm] = useState({
    workout_name: '',
    activity: '',
    weight: '',
    fat: '',
    bmi: '',
    date: '',
  });
  const [showForm, setShowForm] = useState(false);

const userId = JSON.parse(sessionStorage.getItem("user"))?.id;

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/fitness/${userId}`);
      setFitData(res.data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  useEffect(() => {
    fetchData();
  },);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/fitness', { ...form, userId });
      fetchData();
      setForm({
        workout_name: '',
        activity: '',
        weight: '',
        fat: '',
        bmi: '',
        date: '',
      });
      setShowForm(false);
    } catch (err) {
      console.error("Submit error:", err);
    }
  };

  return (
    <div className="Trackcontainer">
      <h1>Your <span className="highlights">Fitness</span> Dashboard</h1>
      <h2>
        Add <span className="highlights">Data</span>
        <button onClick={() => setShowForm(!showForm)}>{showForm ? 'x' : '+'}</button>
      </h2>

      {showForm && (
        <form onSubmit={handleSubmit} className="trackform">
          <input name="workout_name" placeholder="Workout Name" onChange={handleChange} required />
          <select name="activity" onChange={handleChange} required>
            <option value="">Select Activity</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="HIIT">HIIT</option>
          </select>
          <input name="weight" type="number" placeholder="Weight (kg)" onChange={handleChange} required />
          <input name="fat" type="number" placeholder="Body Fat (%)" onChange={handleChange} required />
          <input name="bmi" type="number" placeholder="Heart Rate (BPM)" onChange={handleChange} required />
          <input name="date" type="date" onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      )}

      <table>
        <thead>
          <tr>
            <th>Workout Name</th>
            <th>Activity</th>
            <th>Weight</th>
            <th>Fat %</th>
            <th>Heart Rate</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {fitData.map((item, idx) => (
            <tr key={idx}>
              <td>{item.workout_name}</td>
              <td>{item.activity}</td>
              <td>{item.weight} kg</td>
              <td>{item.fat} %</td>
              <td>{item.bmi} bpm</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Track;