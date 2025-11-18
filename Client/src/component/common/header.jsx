import React, { useEffect, useRef, useState } from "react";
import "../../styles/header.css";
import logo from "../../assets/img/Health___Fitness.png";
import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/authcontext";
import UserAvatar from "../userAvater";

const nav__links = [
  {
    path: "/home",
    display: "Home",
  },
  {
    display: (
      <span className="arrow">
        Programs <i className="ri-arrow-down-s-line"></i>
      </span>
    ),
    children: [
      { path: "/homeworkout", display: "Home Workout" },
      { path: "/gymworkout", display: "Gym Workout" },
      { path: "/mealsection", display: "Meal Plan" },
    ],
  },
  {
    path: "/membership",
    display: "Membership",
  },
  {
    path: "/track",
    display: "Track your fitness",
  },
];

const Header = () => {
  const { authUser, logout } = useAuth();
  const [activeItem, setActiveItem] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [anchorEl, setAnchorEl] = useState(null);


  // Fallback: get from localStorage if authUser  not available
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const user = authUser || storedUser;
const navigate=useNavigate();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleItemClick = (path) => {
    setActiveItem(path);
    setIsMobileMenuOpen(false); // Close mobile menu on item click
  };

  const handleLogout = () => {
    logout();
    handleClose();
    navigate("/");
  };
  const headerRef = useRef(null);
  const headerFunc = () => {
    if (
      document.body.scrollTop > 80 ||
      document.documentElement.scrollTop > 80
    ) {
      headerRef.current.classList.add("sticky__header");
    } else {
      headerRef.current.classList.remove("sticky__header");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", headerFunc);
    return () => window.removeEventListener("scroll", headerFunc);
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="container">
        <div className="nav__wrapper">
          <div className="logo">
            <div className="logo__img">
              <img src={logo} alt="Health & Fitness Logo" className="" />
            </div>
            <h2 className="text-red-600">Health & Fitness</h2>
          </div>

          <div className="navigation">
            <ul className={`menu ${isMobileMenuOpen ? "open" : ""}`}>
              {nav__links.map((item) => (
                <li className="nav__item" key={item.path || item.display}>
                  {item.path ? (
                    <NavLink to={item.path} onClick={() => handleItemClick(item.path)}>
                      {item.display}
                    </NavLink>
                  ) : (
                    item.display
                  )}

                  {/* Dropdown if children exist */}
                  {item.children && (
                    <ul className="dropdown">
                      {item.children.map((child) => (
                        <li
                          key={child.path}
                          className={activeItem === child.path ? 'active' : ''}
                          onClick={() => handleItemClick(child.path)}
                        >
                          <NavLink
                            to={child.path}
                            activeClassName="active" // React Router active class
                          >
                            {child.display}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
              {/* Add Log In button to mobile menu */}

            </ul>
          </div>

          <div className="nav__right">
            {user ? (
<UserAvatar user={user} onLogout={handleLogout} />
            ) : (
              <NavLink to="/">
                <button className="register__btn">Log In</button>
              </NavLink>
            )}
            <span className="mobile__menu" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <i className="ri-menu-line"></i>
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
