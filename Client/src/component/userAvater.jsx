import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";

const UserAvatar = ({ user, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const openLogoutConfirm = () => {
    setOpenLogoutDialog(true);
    handleMenuClose();
  };

  const closeLogoutConfirm = () => {
    setOpenLogoutDialog(false);
  };

  const confirmLogoutAction = () => {
    onLogout();    // execute logout from Header
    closeLogoutConfirm();
  };

  return (
    <>
      {/* Avatar */}
      <Avatar onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
        {user?.name?.charAt(0).toUpperCase() || "U"}
      </Avatar>

      {/* Menu */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem onClick={handleMenuClose}>
          <NavLink to="/userprofile">Profile</NavLink>
        </MenuItem>
        <MenuItem onClick={openLogoutConfirm}>Logout</MenuItem>
      </Menu>

      {/* Logout Dialog */}
      <Dialog open={openLogoutDialog} onClose={closeLogoutConfirm}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeLogoutConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmLogoutAction} color="primary">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default UserAvatar;
