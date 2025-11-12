import React from "react";
import logo from "../assets/img/Health___Fitness.png";
import { companyLinks,livingLinks,quickLinks } from "../data/footer-box";
import FooterBox from "../component/footerBox";
import "../styles/footer.css"
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="footer" data-aos-duration="1100" data-aos="fade-up">
      <div className="container">
      <div className="footer_head">
            <div className="logo">
              <div className="logo__img">
                <img src={logo} alt="Health & Fitness Logo" />
              </div>
              <h2>Health & Fitness</h2>
            </div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Blanditiis itaque fugit nam mollitia nulla soluta.
            </p>
          </div>
        <div className="footer__wrapper">
          <FooterBox title="Company" links={companyLinks} />
          <FooterBox title="Healthy Living" links={livingLinks} />
          <FooterBox title="Quick Links" links={quickLinks} />
        </div>

        <p className="copyright">
          Copyright - {year} developed by Soham. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
