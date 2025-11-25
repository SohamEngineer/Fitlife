import React from "react";
import "./style/header.css";
import { NavLink } from "react-router-dom";
import UserAvatar from "../../userAvater";
import { assets } from "../../../assets/img/assets";
import { useHeader } from "./hook/useHeader";
import DrawerMenu from "../../drawer";

const nav__links = [
  { path: "/home", display: "Home" },
  { path: "/about", display: "About us" },
  {
    display: "Programs",
    children: [
      { path: "/homeworkout", display: "Home Workout" },
      { path: "/gymworkout", display: "Gym Workout" },
      { path: "/mealsection", display: "Meal Plan" },
    ],
  },
  { path: "/membership", display: "Membership" },
  { path: "/track", display: "Track your fitness" },
];

const Header = () => {
  const {
    activeItem,
    user,
    handleItemClick,
    handleLogout,
    headerRef,
    toggleDrawer,
    drawerOpen
  } = useHeader();

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">

          {/* Logo */}
          <div className="logo">
            <div className="logo__img">
              <img src={assets.logo} alt="Health & Fitness Logo" />
            </div>
            <h2 className="text-red-600">Health & Fitness</h2>
          </div>

          {/* Desktop Navigation */}
          <div className="navigation desktop-only">
            <ul className="menu">
              {nav__links.map((item) => (
                <li key={item.path || item.display} className="nav__item">
                  {item.path ? (
                    <NavLink
                      to={item.path}
                      className={({ isActive }) => (isActive ? "active" : "")}
                      onClick={() => handleItemClick(item.path)}
                    >
                      {item.display}
                    </NavLink>
                  ) : (
                    item.display
                  )}

                  {item.children && (
                    <ul className="dropdown">
                      {item.children.map((child) => (
                        <li key={child.path}>
                          <NavLink
                            to={child.path}
                            className={({ isActive }) =>
                              isActive ? "active" : ""
                            }
                            onClick={() => handleItemClick(child.path)}
                          >
                            {child.display}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>

<div className="nav-right-avter">
  {user ? (
              <UserAvatar user={user} onLogout={handleLogout}  className="avater"/>
            ) : (
              <NavLink to="/">
                <button className="register__btn">Log In</button>
              </NavLink>
            )}
</div>
          {/* Right Section */}
          <div className="nav__right">
            {/* Mobile Menu Icon */}
            <span className="mobile__menu" onClick={toggleDrawer(true)}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </div>

      {/* Drawer Component */}
      <DrawerMenu
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        navLinks={nav__links}
        handleItemClick={handleItemClick}
        user={user}
        handleLogout={handleLogout}
      />

    </header>
  );
};

export default Header;
