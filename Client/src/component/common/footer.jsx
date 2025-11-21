import React from "react";
import "../../styles/footer.css";
import { FaLinkedin } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { assets } from "../../assets/img/assets";



const Footer = () => {
  return (
    <footer className="footer">
      
      <div className="footer-grid">

        {/* LEFT SECTION */}
        <div className="footer-left">
        <div className="logobox">
            <img src={assets.logo} alt="logo" className="footer-logo" />
            <span>Health & Fitness</span>
        </div>

          <p className="footer-description">
            Health & Fitness provides wellness solutions, workout guidance,
            and nutrition tips to help you stay fit and healthy.
          </p>

          {/* SOCIAL ICONS */}
          <ul className="footer-social">
            <li>
              <a href="/">
                <FaLinkedin />
              </a>
            </li>

            <li>
              <a href="#">
                <FaFacebook />
              </a>
            </li>

            <li>
              <a href="#">
                <FaTwitter />
              </a>
            </li>
          </ul>
        </div>

        {/* RIGHT SECTION LINKS */}
        <div className="footer-links-grid">

          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-link-list">
              <li><a href="#">Personal Training</a></li>
              <li><a href="#">Nutrition Plans</a></li>
              <li><a href="#">Online Coaching</a></li>
              <li><a href="#">Diet Analysis</a></li>
              <li><a href="#">Workouts</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Platforms</h4>
            <ul className="footer-link-list">
              <li><a href="#">Mobile App</a></li>
              <li><a href="#">Web Dashboard</a></li>
              <li><a href="#">Progress Tracker</a></li>
              <li><a href="#">Meal Planner</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Company</h4>
            <ul className="footer-link-list">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Community</a></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Additional</h4>
            <ul className="footer-link-list">
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Support</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">News</a></li>
            </ul>
          </div>

        </div>

      </div>

      <hr className="footer-divider" />

      <div className="footer-bottom">
        <ul className="footer-bottom-links">
          <li><a href="#">Terms of Service</a></li>
          <li><a href="#">Privacy Policy</a></li>
          <li><a href="#">Security</a></li>
        </ul>

        <p className="footer-copy">
          © {new Date().getFullYear()} Health & Fitness. All rights reserved.
        </p>
      </div>

    </footer>
  );
};

export default Footer;
