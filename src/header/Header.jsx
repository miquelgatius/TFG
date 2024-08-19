import { NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  return (
    <nav className="navbar">
      <ul className="header-list">
        <li>
          <NavLink to="/bills" end>
            <button className="header-button">Bills</button>
          </NavLink>
        </li>
        <li>
          <NavLink to="/about">
            <button className="header-button">About</button>
          </NavLink>
        </li>
        <li className="login">
          <NavLink to="/login">
            <button className="header-button login"> Login </button>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Header;
