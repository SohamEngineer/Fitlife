import React from "react";
import "./style/dashbord.css";

import HomeWorkoutTable from "../fetchworkout/fetchHome/fetchhome";
import GymWorkoutTable from "../fetchworkout/fetchGym/fetchgym";
import useDashboard from "./hook/useDashboard";

const AdminDashboard = () => {
 const {users,userCount}=useDashboard();
  return (
    <div className="dashboard-container">

      {/* Header */}
      <h1>User Dashboard</h1>

      {/* Summary Box */}
      <div className="summary-box">
        <h2>Total Users</h2>
        <p>{userCount}</p>
      </div>

      {/* Users Table */}
      <div className="user-table-container">
        <h2>All Users</h2>

        <table className="user-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>

          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Home Workout Table */}
      <HomeWorkoutTable />

      {/* Gym Workout Table */}
      <GymWorkoutTable />
    </div>
  );
};

export default AdminDashboard;
