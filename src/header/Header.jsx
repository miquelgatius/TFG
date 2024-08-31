import { NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const logout = () => {
    console.log("logout");
    localStorage.setItem("username", null);
    console.log(localStorage.getItem("username"));
  };
  return (
    <nav>
      <ul className="header-list">
        <li className="nav-website-name">
          <img
            className="header-logo"
            src="../assets/invoice.svg"
            alt="website logo"
          />
          <span>InvoiceControlHub</span>
        </li>
        <li className="nav-center-items">
          <NavLink className="header-button" to="/invoice" end>
            Real Estate
          </NavLink>
          <NavLink className="header-button" to="/about">
            About
          </NavLink>
        </li>
        <li className="nav-right-items">
          {localStorage.getItem("username") !== "null" &&
          localStorage.getItem("username") ? (
            <a
              className="header-button login-border"
              href="/login"
              onClick={logout}
            >
              Logout
            </a>
          ) : (
            <NavLink className="header-button login-border" to="/login">
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
