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
import ProtectedRoute from "./components/protected-route/ProtectedRoute.jsx";
import About from "./pages/about/About.jsx";

function App() {
  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Navigate to="auth" />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/home" element={<Home />} />
          <Route path="/details/:searchedName" element={<Details />} />
          <Route path="/about" element={<About />} />

          <Route
            path="/readlist"
            element={<ProtectedRoute element={Readlist} />}
          />
          <Route path="/Lists" element={<ProtectedRoute element={Lists} />} />
          <Route
            path="/list/:searchedList"
            element={<ProtectedRoute element={ListContent} />}
          />
          <Route
            path="/rating"
            element={<ProtectedRoute element={RatingPrompt} />}
          />
          <Route
            path="/create-list"
            element={<ProtectedRoute element={CreateList} />}
          />
          <Route
            path="/create-title"
            element={<ProtectedRoute element={CreateTitle} />}
          />

          {/* // Example of props being passed to the component through the wrapper component 'ProtectedRoute'
              <Route
               path="/create-title"
               element={<ProtectedRoute element={CreateTitle} someProp="examplePropValue"/>}
              />
            */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
