import { NavLink } from "react-router-dom";

const FooterBox = ({ title, links }) => {
  return (
    <div className="footer__box">
      <h4 className="footer__title">{title}</h4>
      <ul className="footer__links">
        {links.map((link, index) => (
          <li key={index}>
            <NavLink to={link.to}>{link.label}</NavLink>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterBox;
