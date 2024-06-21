import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Auth } from "./pages/auth/Auth.jsx";
import AddTitle from "./pages/add-title/AddTitle.jsx";
import List from "./pages/list/List.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import CreateList from "./pages/create-list/CreateList.jsx";
import ButtonReadlist from "./pages/details/components/button-readlist/ButtonReadlist.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/button" element={<ButtonReadlist />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/list/:searchedList" element={<List />} />
          <Route path="/create-List" element={<CreateList />} />
          <Route path="/add-title" element={<AddTitle />} />
          <Route path="/details/:searchedName" element={<Details />} />
          <Route path="/" element={<Navigate to="auth" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
