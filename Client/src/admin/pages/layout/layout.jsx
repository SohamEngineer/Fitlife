import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./style/layout.css";

import Avatar from "@mui/material/Avatar";
import useLayout from "./hook/useLayout";
function AdminPanal() {
  const {
    user,

    handleLogout,
  } = useLayout();

  return (
    <div className="admin-container">
      {/* SIDEBAR */}
      <aside className="admin-sidebar">
  <h2>Admin View</h2>
  <div className="line"></div>

  {/* NAV LINKS */}
  <ul className="sidebar-menu">
    <li>
      <NavLink to="/admin" end className={({ isActive }) => isActive ? "active" : ""}>
        Dashboard
      </NavLink>
    </li>

    <li>
      <NavLink to="/admin/addHomeWorkout" className={({ isActive }) => isActive ? "active" : ""}>
        Home Workout
      </NavLink>
    </li>

    <li>
      <NavLink to="/admin/addGymWorkout" className={({ isActive }) => isActive ? "active" : ""}>
        Gym Workout
      </NavLink>
    </li>
  </ul>

  {/* FOOTER */}
  <div className="sidebar-footer">
    <div className="footer-user">
      <Avatar sx={{ width: 32, height: 32 }}>
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </Avatar>
      <span className="user-name">{user?.name || "Admin"}</span>
    </div>

    <button
      type="button"
      className="logout-btn"
      onClick={handleLogout}
    >
      Logout
    </button>
  </div>
</aside>


      {/* CONTENT */}
      <div className="admin-content">
        

        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanal;
