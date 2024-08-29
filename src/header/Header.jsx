import { NavLink } from "react-router-dom";
import "../styles/Header.css";

function Header() {
  const logout = () => {
    console.log("logout");
    localStorage.setItem("username", null);
    console.log(localStorage.getItem("username"));
  };
  return (
    <nav className="navbar">
      <ul className="header-list">
        <li className="header-website-name">
          <img
            className="header-logo"
            src="../assets/invoice.svg"
            alt="website logo"
          />
          <span>InvoiceControlHub</span>
        </li>
        <li>
          <NavLink className="header-button" to="/invoice" end>
            Real Estate
          </NavLink>
        </li>
        <li>
          <NavLink className="header-button" to="/about">
            About
          </NavLink>
        </li>
        <li className="login">
          {localStorage.getItem("username") !== "null" &&
          localStorage.getItem("username") ? (
            <a className="header-button" href="/login" onClick={logout}>
              Logout
            </a>
          ) : (
            <NavLink className="header-button" to="/login">
              Login
            </NavLink>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Header;
