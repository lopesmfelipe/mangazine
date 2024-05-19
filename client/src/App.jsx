import Grid from "./components/Grid.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";
import AddTitle from "./pages/addTitle/AddTitle.jsx";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Grid />} />
            <Route path="/addtitle" element={<AddTitle />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
