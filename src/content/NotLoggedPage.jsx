import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/NotLoggedPage.css";

const NotLoggedPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const submitLogin = async (e) => {
    e.preventDefault();
    // You can add validation here
    if (username.length < 6) {
      setErrorMessage("Username too short");
      console.log(errorMessage);
    } else if (password < 6) {
      setErrorMessage("Password too short");
    } else {
      setErrorMessage("");

      try {
        const response = await axios.post("http://localhost:8080/user/login", {
          username,
          password,
        });

        // Handle successful login here
        console.log("Login successful", response.data);
        localStorage.setItem("username", username);

        // Redirect to login successful
        window.location.reload();
      } catch (error) {
        console.error("Error during login:", error);
        setErrorMessage("Login failed. Wrong credentials.");
      }
    }
  };
  const createUserNavigate = () => {
    navigate("/createUser");
  };

  return (
    <section className="login-form">
      <h2>Login</h2>
      <form className="form" onSubmit={submitLogin}>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="error-message">
          <span>{errorMessage}</span>
        </div>
        <button className="login-button" type="submit">
          Login
        </button>
        <div className="create-new-account">
          <a onClick={createUserNavigate}>Click here to create a new user</a>
        </div>
      </form>
    </section>
  );
};

export default NotLoggedPage;
