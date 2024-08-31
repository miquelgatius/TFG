import LoggedPage from "./LoggedPage";
import NotLoggedPage from "./NotLoggedPage";

const Login = () => {
  /*  console.log(localStorage.getItem("username"));
  const username = localStorage.getItem("username");

  if (username !== "null") {
    console.log("yes");
  } else {
    console.log("no");
  }
    */

  return (
    <div>
      {localStorage.getItem("username") !== "null" &&
      localStorage.getItem("username") ? (
        <LoggedPage />
      ) : (
        <NotLoggedPage />
      )}
    </div>
  );
};

export default Login;
