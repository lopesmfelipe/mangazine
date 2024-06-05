import { useState } from "react";
import "../../styles/general.css";
import "./home.css";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [searchedName, setSearchedName] = useState("");
  let navigate = useNavigate();

  const handlekeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/details/${searchedName}`);
    }
  };

  return (
    <>
      <header>
        <div className="menu">
          <button>Readlist</button>
          <button>Profile</button>
        </div>
      </header>
      <main>
        <div className="text-container">
          <h1 className="home-title">MANGABOOK</h1>
          <h2>Mangas & Books All in One Place!</h2>
          <h3>Search, rate, list and share your favorite mangas and books </h3>
        </div>
        <div className="searchbar-container">
          <input
            type="text"
            placeholder="Search"
            value={searchedName}
            onChange={(event) => setSearchedName(event.target.value)}
            onKeyDown={handlekeyPress}
            className="searchbar"
          />
        </div>
      </main>
    </>
  );
};

export default Home;
