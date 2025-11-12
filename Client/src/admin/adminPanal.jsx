import React, { useState } from 'react';
import { NavLink, Outlet } from "react-router-dom";
import "./adminPanel.css";
import { useAuth } from '../utils/AuthContext';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";

function AdminPanal() {
  const { authUser,logout } = useAuth();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = authUser || storedUser;
   const [anchorEl, setAnchorEl] = useState(null);
  
    const handleAvatarClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <h2>Admin View</h2>
        <div className='line'></div>
        <ul>
          <li>
            <NavLink to="/admin" end className={({ isActive }) => (isActive ? "active" : "")}>
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/addHomeWorkout" className={({ isActive }) => (isActive ? "active" : "")}>
              Home Workout
            </NavLink>
          </li>
          <li>
            <NavLink to="/admin/addGymWorkout" className={({ isActive }) => (isActive ? "active" : "")}>
              Gym Workout
            </NavLink>
          </li>
        </ul>
      </aside>

      <div className="admin-content">
      <div className="admin-heading">
      <div className='admin-avter'>
            {user ? (
              <>
                <Avatar
                  onClick={handleAvatarClick}
                  style={{ cursor: "pointer" }}
                  className='Avatar'
                >
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </Avatar>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>
                    <NavLink to="/userprofile">Profile</NavLink>
                  </MenuItem>

                 

                  <MenuItem
                    onClick={() => {
                      logout();
                      handleClose();
                    }}
                  >
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              console.log("hello")
            )}

            
            </div>
          </div>
        <Outlet />
</div>
      </div>
   
  );
}

export default AdminPanal;
