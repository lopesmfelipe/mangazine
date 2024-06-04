import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import AddTitle from "./pages/add-title/AddTitle.jsx";
import List from "./pages/list/List.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/add-title" element={<AddTitle />} />
            <Route path="/details" element={<Details /> } />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
