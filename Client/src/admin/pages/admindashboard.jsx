import React, { useEffect, useState } from "react";
import "../style/dashbord.css";

import HomeWorkoutTable from "./fetchhome";
import GymWorkoutTable from "./fetchgym";
import { getAllUsers } from "../../api/admin/user.api";

const AdminDashboard = () => {
  // Store user list
  const [users, setUsers] = useState([]);

  // Total user count
  const [userCount, setUserCount] = useState(0);

  // Fetch users on component mount
  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await getAllUsers();

        /*
          API returns:
          {
            users: [...],
            totalUsers: number
          }
        */

        setUsers(data.users);
        setUserCount(data.totalUsers);

      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    loadUsers();
  }, []);

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
