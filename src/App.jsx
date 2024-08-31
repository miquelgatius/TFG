import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./content/Login";
import CreateUser from "./content/CreateUser";
import Invoice from "./content/InvoiceMain";
import About from "./content/About";
import Header from "./header/Header";
import "./App.css";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="createUser" element={<CreateUser />} />
        <Route path="invoice" element={<Invoice />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
