import { NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <nav className="navbar">
      <ul className="header-list">
        <li>
          <NavLink className="header-button" to="/bills" end>
            Bills
          </NavLink>
        </li>
        <li>
          <NavLink className="header-button" to="/about">
            About
          </NavLink>
        </li>
        <li className="login">
          <NavLink className=" header-button" to="/login">
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
