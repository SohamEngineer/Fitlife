import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useNavigate} from "react-router-dom";

const UserAvatar = ({ user, onLogout }) => {
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
const navigate=useNavigate();
  const handleAvatarClick = (event) => {
    navigate("/profile")
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
