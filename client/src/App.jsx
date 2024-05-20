import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import AddTitle from "./pages/add-title/AddTitle.jsx";
import List from "./pages/list/List.jsx";
import Home from "./pages/home/Home.jsx";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/home" element={<Home />} />
            <Route path="/list" element={<List />} />
            <Route path="/addtitle" element={<AddTitle />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
