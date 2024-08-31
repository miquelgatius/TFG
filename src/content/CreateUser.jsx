import { useState } from "react";
import axios from "axios";

const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const submitCreateUser = async (e) => {
    //to prevent any default function of the click on button
    e.preventDefault();
    // Validation of errors
    if (username.length < 6) {
      setErrorMessage("Username too short");
      console.log(errorMessage);
    } else if (password < 6) {
      setErrorMessage("Password too short");
    } else if (password !== passwordConfirm) {
      setErrorMessage("Passwords don't match");
    } else {
      setErrorMessage("");

      try {
        const response = await axios.post("http://localhost:8080/user/signUp", {
          username,
          password,
        });

        // Handle successful login here
        console.log("Created new user successfully", response.data);
        //optional if you want to login just after creating the user
        //localStorage.setItem("username", username);

        // optional Redirect to login successful
        //window.location.reload();
      } catch (error) {
        console.error("Error during creating new user:", error);
        setErrorMessage("Creating new user has failed.");
      }
    }
  };

  return (
    <>
      <section className="login-form">
        <h2>Please fill the fields to create a new user</h2>
        <form className="form" onSubmit={submitCreateUser}>
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
          <div className="form-group">
            <label htmlFor="passwordConfirm">Confirm password:</label>
            <input
              type="password"
              id="passwordConfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          <div>
            <span className="error-message">{errorMessage}</span>
          </div>
          <div></div>
          <button className="login-button" type="submit">
            Create new user
          </button>
        </form>
      </section>
    </>
  );
};

export default CreateUser;
