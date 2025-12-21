import "../../styles/track.css";
import useTrack from "./hook/useTrack";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


const Track = () => {
  const {
    fitData,
    showForm,
    setShowForm,
    form,
    editingId,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useTrack();

  return (
    <div className="Trackcontainer">
      <h1>
        Your <span className="highlights">Fitness</span> Dashboard
      </h1>

      <h2>
        Add <span className="highlights">Data</span>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? "x" : "+"}
        </button>
      </h2>

      {/* Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="trackform">
          <input
            name="workout_name"
            value={form.workout_name}
            placeholder="Workout Name"
            onChange={handleChange}
            required
          />

          <select
            name="activity"
            value={form.activity}
            onChange={handleChange}
            required
          >
            <option value="">Select Activity</option>
            <option value="Cardio">Cardio</option>
            <option value="Strength">Strength</option>
            <option value="HIIT">HIIT</option>
          </select>

          <input
            name="weight"
            type="number"
            value={form.weight}
            placeholder="Weight (kg)"
            onChange={handleChange}
            required
          />

          <input
            name="fat"
            type="number"
            value={form.fat}
            placeholder="Body Fat (%)"
            onChange={handleChange}
            required
          />

          <input
            name="bmi"
            type="number"
            value={form.bmi}
            placeholder="Heart Rate (BPM)"
            onChange={handleChange}
            required
          />

          <input
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {editingId ? "Update" : "Submit"}
          </button>
        </form>
      )}

      {/* Table */}
      <table>
        <thead>
          <tr>
            <th>Workout</th>
            <th>Activity</th>
            <th>Weight</th>
            <th>Fat %</th>
            <th>Heart Rate</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {fitData.map((item) => (
            <tr key={item._id}>
              <td>{item.workout_name}</td>
              <td>{item.activity}</td>
              <td>{item.weight} kg</td>
              <td>{item.fat} %</td>
              <td>{item.bmi} bpm</td>
              <td>{new Date(item.date).toLocaleDateString()}</td>
              <td className="edit_delete">
                <p onClick={() => handleEdit(item)}><FaEdit /></p>
                <p onClick={() => handleDelete(item._id)}><MdDelete /></p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Track;
