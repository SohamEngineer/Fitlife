import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/component-style/drawer.css"

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import Box from "@mui/material/Box";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { assets } from "../assets/img/assets";

const DrawerMenu = ({ open, onClose, navLinks, handleItemClick }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleToggle = (index) => {
    setOpenDropdown(openDropdown === index ? null : index);
  };

  return (
    <Drawer open={open} onClose={onClose}>

      <Box sx={{ width: 300 }} role="presentation">
        <div className="drawer-header">
          <div className="drawer-logo">
            <img src={assets.logo} alt="Logo" />
            <h3>Health & Fitness</h3>
          </div>

          {/* Close Button */}
          <i className="ri-close-line" onClick={onClose}></i>
        </div>
        <div className="profile-menu" onClick={onClose}>
          <NavLink
            to="/profile"
            className={({ isActive }) =>
              isActive ? "drawer-link active" : "drawer-link"
            }
            onClick={() => handleItemClick("/profile")}
          >
            <span>Profile</span>
          </NavLink>
        </div>

        <List>
          {navLinks.map((item, index) => (
            <React.Fragment key={item.display}>

              {/* === NORMAL LINK === */}
              {item.path ? (
                <ListItem disablePadding onClick={onClose}>
                  <ListItemButton>
                    <NavLink
                      to={item.path}
                      className="drawer-link"
                      onClick={() => handleItemClick(item.path)}
                    >
                      <ListItemText primary={item.display} />
                    </NavLink>
                  </ListItemButton>

                </ListItem>
              ) : (

                /* === DROPDOWN SECTION === */
                <>
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => handleToggle(index)} >
                      <ListItemText
                        primary={item.display}
                        sx={{ fontWeight: "bold" }}
                      />
                      {openDropdown === index ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )}
                    </ListItemButton>
                  </ListItem>

                  {/* === COLLAPSIBLE CHILDREN === */}
                  <Collapse in={openDropdown === index} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.children?.map((child) => (
                        <ListItem key={child.path} disablePadding onClick={onClose}>
                          <ListItemButton sx={{ pl: 4 }} >
                            <NavLink
                              to={child.path}

                              onClick={() => handleItemClick(child.path)}
                            >
                              <ListItemText primary={child.display} />
                            </NavLink>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>

                </>
              )}

            </React.Fragment>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default DrawerMenu;
