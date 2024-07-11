import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Auth } from "./pages/auth/Auth.jsx";
import AddTitle from "./pages/add-title/AddTitle.jsx";
import ListContent from "./pages/list-content/ListContent.jsx";
import Lists from "./pages/lists/Lists.jsx";
import Home from "./pages/home/Home.jsx";
import Details from "./pages/details/Details.jsx";
import CreateList from "./pages/create-list/CreateList.jsx";
import "./general.css";
import Readlist from "./pages/readlist/Readlist.jsx";
import Test from "./testing/Test.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/test" element={<Test />} />

          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/lists" element={<Lists />} />
          <Route path="/readlist" element={<Readlist />} />
          <Route path="/list/:searchedList" element={<ListContent />} />
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
