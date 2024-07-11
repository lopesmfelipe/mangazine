import classes from "./style.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Searchbar = () => {
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSearch = async (event) => {
    if (event.key === "Enter" && name.trim() !== "") {
      setLoading(true);
      setError(null);
      try {
        console.log(name);
        const response = await axios.get(
          `http://localhost:2000/api/v1/titles/search?name=${name}`
        );
        console.log("Response Data:", response.data); // Log the response data
        setResults(response.data.data.titles);
        setShowResults(true);
      } catch (err) {
        console.log(err);
        setError("An error occurred while searching. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleClick = (id) => {
    navigate(`/details/${id}`);
  };

  return (
    <div className={classes.container}>
      <input
        type="text"
        placeholder="Search"
        value={name}
        onChange={(event) => setName(event.target.value)}
        onKeyDown={handleSearch}
        className={classes.searchbar}
      />
      {loading && <div className={classes.loading}> Loading...</div>}
      {error && <div className={classes.error}>{error}</div>}
      {showResults && !loading && (
        <div
          className={`${classes.gridContainer} ${
            showResults ? "" : classes.hidden
          }`}
        >
          {results.map((title) => (
            <div
              key={title._id}
              onClick={() => handleClick(title.name)}
              className={classes.gridItem}
            >
              <img src={title.cover} className={classes.cover} />
              <div className={classes.informationContainer}>
                <p className={classes.name}>{title.name}</p>
                <div className={classes.box2}>
                  <p className={classes.author}>{title.author} • </p>
                  <p className={classes.releaseYear}> {title.releaseYear}</p>
                </div>
                <p> {title.type}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
