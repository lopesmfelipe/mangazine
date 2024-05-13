import Grid from "./components/Grid.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Auth } from "./pages/auth";

function App() {
  return (
    <>
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Grid />} />
            <Route path="/auth" element={<Auth />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;
