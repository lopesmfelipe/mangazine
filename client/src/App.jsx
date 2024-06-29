import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Auth } from "./pages/auth/Auth.jsx";
import AddTitle from "./pages/add-title/AddTitle.jsx";
import ListContentPage from "./pages/list-content-page/ListContentPage.jsx";
import AllListsPage from "./pages/all-lists-page/AllListsPage.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import CreateList from "./pages/create-list/CreateList.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lists" element={<AllListsPage />} />
          <Route path="/list/:searchedList" element={<ListContentPage />} />
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
