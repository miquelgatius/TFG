import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./content/Login";
import CreateUser from "./content/CreateUser";
import Properties from "./content/propertyPage/PropertyMain";
import Invoices from "./content/invoicePage/InvoicesMain";
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
        <Route path="properties" element={<Properties />} />
        <Route path="/properties/:registry" element={<Invoices />} />
        <Route path="about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
