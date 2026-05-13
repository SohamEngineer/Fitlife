import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./style/layout.css";

import Avatar from "@mui/material/Avatar";
import { FiActivity, FiDatabase, FiGrid, FiHome, FiLogOut, FiShield } from "react-icons/fi";
import useLayout from "./hook/useLayout";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: <FiGrid /> },
  { to: "/admin/addHomeWorkout", label: "Home Workouts", icon: <FiHome /> },
  { to: "/admin/addGymWorkout", label: "Gym Workouts", icon: <FiActivity /> },
];

function AdminPanal() {
  const {
    user,

    handleLogout,
  } = useLayout();

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <div className="admin-brand-mark">
            <FiShield />
          </div>
          <div>
            <p>Fitlife</p>
            <h2>Admin Console</h2>
          </div>
        </div>

        <div className="admin-sidebar-status">
          <FiDatabase />
          <span>Production data</span>
        </div>

        <ul className="sidebar-menu">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink to={item.to} end={item.to === "/admin"} className={({ isActive }) => isActive ? "active" : ""}>
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="sidebar-footer">
          <div className="footer-user">
            <Avatar sx={{ width: 38, height: 38 }}>
              {user?.name?.charAt(0).toUpperCase() || "A"}
            </Avatar>
            <div>
              <span className="user-name">{user?.name || "Admin"}</span>
              <span className="user-role">Administrator</span>
            </div>
          </div>

          <button
            type="button"
            className="logout-btn"
            onClick={handleLogout}
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </aside>

      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminPanal;
