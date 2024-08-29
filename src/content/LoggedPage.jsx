const LoggedPage = () => {
  const username = localStorage.getItem("username");
  return (
    <div>
      <h1>Logged as {username}</h1>
    </div>
  );
};

export default LoggedPage;
