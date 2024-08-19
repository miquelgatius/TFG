import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
//import NotLogged from "./content/NotLogged";
import "./App.css";
import Bills from "./content/BillsMain";
import About from "./content/About";

function App() {
  return (
    <Router>
      <Routes>
        <Route>
          <Route path="/" element={<Bills />} />
          <Route path="bills" element={<Bills />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
