import { useState, useEffect } from 'react';
import '../../styles/track.css';

// Import API functions (Separated from UI)
import { getFitnessDataApi, addFitnessEntryApi } from '../../api/track.api';
const Track = () => {
  const [fitData, setFitData] = useState([]);

  // Form state for new fitness entry
  const [form, setForm] = useState({
    workout_name: '',
    activity: '',
    weight: '',
    fat: '',
    bmi: '',
    date: '',
  });

  const [showForm, setShowForm] = useState(false);

  // Logged-in user ID stored in sessionStorage
  const userId = JSON.parse(sessionStorage.getItem("user"))?.id;

  /**
   * Fetch fitness data for the logged-in user
   */
  const fetchData = async () => {
    try {
      const data = await getFitnessDataApi(userId); // ⬅ API call (clean)
      setFitData(data);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  /**
   * Fetch data once on component mount
   */
  useEffect(() => {
    fetchData();
  }, []);

  /**
   * Update form state on user input
   */
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /**
   * Submit new fitness entry
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addFitnessEntryApi({ ...form, userId }); // ⬅ API call (clean)

      fetchData(); // Refresh table

      // Reset form fields
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
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'x' : '+'}
        </button>
      </h2>

      {/* Add Fitness Entry Form */}
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

      {/* Fitness Data Table */}
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
