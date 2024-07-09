import classes from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  const handleClick = (event) => {
    navigate(`/details/${query}`);
  };

  const handleSearch = async (event) => {
    if (event.key === "Enter") {
      try {
        const response = await axios.get(`/api/titles/search?${query}`);
        setResults(response.data);
        setShowResults(true);
      } catch (err) {
        console.log(err);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={handleSearch}
        className={classes.searchbar}
      />
      {showResults && (
        <div>
          {results.map((title) => (
            <div key={title._id}>
              <img src="" alt="" />
              <div>
                <h3>NAME</h3>
                <p>AUTHOR</p>
                <p>RELEASE YEAR</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
