import React from "react";
import "./style/dashbord.css";

import HomeWorkoutTable from "../fetchworkout/fetchHome/fetchhome";
import GymWorkoutTable from "../fetchworkout/fetchGym/fetchgym";
import useDashboard from "./hook/useDashboard";
import { FiActivity, FiShield, FiTrendingUp, FiUsers } from "react-icons/fi";

const AdminDashboard = () => {
  const { users, userCount } = useDashboard();
  const adminCount = users.filter((user) => user.role === "admin").length;
  const premiumCount = users.filter((user) => user.isPremium).length;
  const latestUser = users[0]?.name || "No users yet";

  return (
    <div className="dashboard-container">
      <section className="admin-dashboard-hero">
        <div>
          <p className="admin-eyebrow">Fitlife operations</p>
          <h1>Admin Dashboard</h1>
          <span>
            Manage members, home workouts, and gym workouts from one focused control center.
          </span>
        </div>
        <div className="admin-hero-chip">
          <FiTrendingUp />
          <span>Live catalog controls</span>
        </div>
      </section>

      <section className="admin-stat-grid" aria-label="Admin overview">
        <article className="admin-stat-card">
          <div className="admin-stat-icon">
            <FiUsers />
          </div>
          <p>Total Users</p>
          <h2>{userCount}</h2>
        </article>

        <article className="admin-stat-card">
          <div className="admin-stat-icon">
            <FiShield />
          </div>
          <p>Admins</p>
          <h2>{adminCount}</h2>
        </article>

        <article className="admin-stat-card">
          <div className="admin-stat-icon">
            <FiActivity />
          </div>
          <p>Premium Users</p>
          <h2>{premiumCount}</h2>
        </article>

        <article className="admin-stat-card wide">
          <p>Latest user</p>
          <h2>{latestUser}</h2>
          <span>Newest records appear in the members table below.</span>
        </article>
      </section>

      <div className="admin-section-card user-table-container">
        <div className="admin-section-header">
          <div>
            <p className="admin-eyebrow">Members</p>
            <h2>All Users</h2>
          </div>
          <span>{userCount} records</span>
        </div>

        <div className="admin-table-scroll">
          <table className="user-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Premium</th>
                <th>Joined</th>
              </tr>
            </thead>

            <tbody>
              {users.length > 0 ? (
                users.map((user) => (
                  <tr key={user._id}>
                    <td data-label="Name">
                      <strong>{user.name}</strong>
                    </td>
                    <td data-label="Email">{user.email}</td>
                    <td data-label="Role">
                      <span className={`status-pill ${user.role === "admin" ? "admin" : ""}`}>
                        {user.role || "user"}
                      </span>
                    </td>
                    <td data-label="Premium">
                      <span className={`status-pill ${user.isPremium ? "premium" : ""}`}>
                        {user.isPremium ? "Premium" : "Free"}
                      </span>
                    </td>
                    <td data-label="Joined">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="empty-table-cell">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <HomeWorkoutTable />
      <GymWorkoutTable />
    </div>
  );
};

export default AdminDashboard;
