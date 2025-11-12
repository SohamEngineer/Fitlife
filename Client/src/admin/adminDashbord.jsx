import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashbord.css"; // We’ll create this next
import HomeWorkoutTable from "./fetchHome";
import GymWorkoutTable from "./fetchGym";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userCount, setUserCount] = useState(0);
  

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/users");
        setUsers(res.data.users);
        setUserCount(res.data.totalUsers);
       
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="dashboard-container">
      <h1>User Dashboard</h1>

      <div className="summary-box">
        <h2>Total Users</h2>
        <p>{userCount}</p>
      </div>

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
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <HomeWorkoutTable/>
      <GymWorkoutTable/>
    </div>
  );
};

export default AdminDashboard;
