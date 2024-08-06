import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Auth } from "./pages/auth/Auth.jsx";
import CreateTitle from "./pages/create-title/CreateTitle.jsx";
import ListContent from "./pages/list-content/ListContent.jsx";
import Lists from "./pages/lists/Lists.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import CreateList from "./pages/create-list/CreateList.jsx";
import "./general.css";
import Readlist from "./pages/readlist/Readlist.jsx";
import RatingPrompt from "./components/rating-prompt/RatingPrompt.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/readlist" element={<Readlist />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/list/:searchedList" element={<ListContent />} />
          <Route path="/details/:searchedName" element={<Details />} />
          <Route path="/create-title" element={<CreateTitle />} />
          <Route path="/create-List" element={<CreateList />} />
          <Route path="/rating" element={<RatingPrompt />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
